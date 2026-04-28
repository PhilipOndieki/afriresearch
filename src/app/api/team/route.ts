export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import type { ApiError } from '@/types/api';

const teamMemberSchema = z.object({
  name: z.string().min(2).max(200),
  role: z.string().min(2).max(200),
  bio: z.string().min(10),
  photo: z.string().url(),
  email: z.string().email().optional(),
  linkedin: z.string().url().optional(),
  sortOrder: z.number().int().default(0),
});

export async function GET() {
  const team = await db.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });
  return NextResponse.json({ data: team });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = teamMemberSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const member = await db.teamMember.create({ data: result.data });
  return NextResponse.json({ data: member }, { status: 201 });
}
