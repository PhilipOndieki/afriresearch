import { NextRequest, NextResponse } from 'next/server';
import type { ApiError } from '@/types/api';

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json<ApiError>({ error: 'No file provided' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json<ApiError>(
      { error: 'File type not allowed. Use JPEG, PNG, or WebP.' },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json<ApiError>({ error: 'File exceeds the 5 MB limit.' }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json<ApiError>(
      { error: 'Upload service is not configured. Set BLOB_READ_WRITE_TOKEN.' },
      { status: 503 },
    );
  }

  try {
    const { put } = await import('@vercel/blob');
    const blob = await put(file.name, file, { access: 'public' });
    return NextResponse.json({ data: { url: blob.url } });
  } catch {
    return NextResponse.json<ApiError>(
      { error: 'Upload failed. Check BLOB_READ_WRITE_TOKEN.' },
      { status: 500 },
    );
  }
}
