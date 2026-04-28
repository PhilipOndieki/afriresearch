export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import type { ApiError } from '@/types/api';

export async function GET() {
  const settings = await db.siteSetting.findMany();
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]));
  return NextResponse.json({ data: map });
}

const settingsUpdateSchema = z.record(z.string(), z.string());

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const result = settingsUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>({ error: 'Invalid settings payload' }, { status: 400 });
  }

  const updates = await Promise.all(
    Object.entries(result.data).map(([key, value]) =>
      db.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } }),
    ),
  );

  return NextResponse.json({ data: updates });
}
