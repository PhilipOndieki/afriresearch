export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trainingProgramSchema } from '@/schemas/training.schema';
import { slugify } from '@/utils/slugify';
import type { ApiError } from '@/types/api';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const activeOnly = searchParams.get('active') !== 'false';

  const programs = await db.trainingProgram.findMany({
    where: activeOnly ? { isActive: true } : {},
    include: {
      sessions: { where: { startDate: { gte: new Date() } }, orderBy: { startDate: 'asc' } },
    },
    orderBy: { title: 'asc' },
  });

  return NextResponse.json({ data: programs });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = trainingProgramSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const slug = slugify(result.data.title);
  const program = await db.trainingProgram.create({ data: { ...result.data, slug } });

  return NextResponse.json({ data: program }, { status: 201 });
}
