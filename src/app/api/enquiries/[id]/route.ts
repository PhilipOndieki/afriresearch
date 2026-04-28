import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { enquiryUpdateSchema } from '@/schemas/enquiry.schema';
import type { ApiError } from '@/types/api';

type Params = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Params) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json<ApiError>({ error: 'Invalid ID' }, { status: 400 });
  }

  const body = await req.json();
  const result = enquiryUpdateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const enquiry = await db.enquiry.update({
    where: { id },
    data: result.data,
  });

  return NextResponse.json({ data: enquiry });
}
