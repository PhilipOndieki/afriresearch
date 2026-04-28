export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectSchema } from '@/schemas/project.schema';
import { slugify } from '@/utils/slugify';
import type { ApiError } from '@/types/api';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cursor = searchParams.get('cursor') ? Number(searchParams.get('cursor')) : undefined;
  const limit = Math.min(Number(searchParams.get('limit') ?? 20), 100);
  const category = searchParams.get('category');
  const status = searchParams.get('status') ?? 'PUBLISHED';
  const featured = searchParams.get('featured');

  const where = {
    status: status as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
    ...(category && { category: { slug: category } }),
    ...(featured === 'true' && { featured: true }),
  };

  const [items, total] = await Promise.all([
    db.project.findMany({
      where,
      include: { category: true, images: { orderBy: { sortOrder: 'asc' }, take: 5 } },
      orderBy: { year: 'desc' },
      take: limit + 1,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    }),
    db.project.count({ where }),
  ]);

  const hasMore = items.length > limit;
  const data = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore ? data[data.length - 1].id : null;

  return NextResponse.json({ data, meta: { total, nextCursor, hasMore } });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = projectSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const slug = slugify(result.data.title);
  const project = await db.project.create({
    data: { ...result.data, slug },
    include: { category: true },
  });

  return NextResponse.json({ data: project }, { status: 201 });
}
