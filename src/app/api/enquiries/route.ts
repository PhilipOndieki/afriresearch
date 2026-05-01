import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/schemas/enquiry.schema';
import { sendEnquiryNotification, sendEnquiryConfirmation } from '@/lib/email';
import type { ApiError } from '@/types/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = enquirySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Fire-and-forget — the email is the record
  Promise.all([
    sendEnquiryNotification(result.data).catch(console.error),
    sendEnquiryConfirmation(result.data.email, result.data.name).catch(console.error),
  ]);

  return NextResponse.json({ data: { success: true } }, { status: 201 });
}
