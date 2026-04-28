import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectUpdateSchema } from '@/schemas/project.schema';
import type { ApiError } from '@/types/api';

type Params = { params: { slug: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const project = await db.project.findUnique({
    where: { slug: params.slug },
    include: { category: true, images: { orderBy: { sortOrder: 'asc' } }, service: true },
  });

  if (!project) {
    return NextResponse.json<ApiError>({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ data: project });
}

export async function PUT(req: NextRequest, { params }: Params) {
  const body = await req.json();
  const result = projectUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const existing = await db.project.findUnique({ where: { slug: params.slug } });
  if (!existing) {
    return NextResponse.json<ApiError>({ error: 'Project not found' }, { status: 404 });
  }

  const updated = await db.project.update({
    where: { slug: params.slug },
    data: result.data,
    include: { category: true },
  });

  return NextResponse.json({ data: updated });
}
