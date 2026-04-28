export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { enquirySchema } from '@/schemas/enquiry.schema';
import { sendEnquiryNotification, sendEnquiryConfirmation } from '@/lib/email';
import type { ApiError } from '@/types/api';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cursor = searchParams.get('cursor') ? Number(searchParams.get('cursor')) : undefined;
  const limit = Math.min(Number(searchParams.get('limit') ?? 20), 100);
  const status = searchParams.get('status');

  const where = status ? { status: status as 'NEW' | 'READ' | 'REPLIED' | 'CLOSED' } : {};

  const [items, total] = await Promise.all([
    db.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    }),
    db.enquiry.count({ where }),
  ]);

  const hasMore = items.length > limit;
  const data = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore ? data[data.length - 1].id : null;

  return NextResponse.json({ data, meta: { total, nextCursor, hasMore } });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = enquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const enquiry = await db.enquiry.create({ data: result.data });

  // Fire-and-forget emails — don't block the response
  Promise.all([
    sendEnquiryNotification(result.data).catch(console.error),
    sendEnquiryConfirmation(result.data.email, result.data.name).catch(console.error),
  ]);

  return NextResponse.json({ data: enquiry }, { status: 201 });
}
