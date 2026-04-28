export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trainingSessionSchema } from '@/schemas/training.schema';
import type { ApiError } from '@/types/api';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const upcoming = searchParams.get('upcoming') !== 'false';

  const sessions = await db.trainingSession.findMany({
    where: upcoming ? { startDate: { gte: new Date() }, status: { in: ['OPEN', 'FULL'] } } : {},
    include: {
      program: true,
      _count: { select: { registrations: true } },
    },
    orderBy: { startDate: 'asc' },
  });

  return NextResponse.json({ data: sessions });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = trainingSessionSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const session = await db.trainingSession.create({ data: result.data });
  return NextResponse.json({ data: session }, { status: 201 });
}
