import { NextRequest, NextResponse } from 'next/server';
import { trainingRegistrationSchema } from '@/schemas/training.schema';
import {
  sendTrainingRegistrationConfirmation,
  sendTrainingRegistrationNotification,
} from '@/lib/email';
import { getSessionById } from '@/config/training';
import type { ApiError } from '@/types/api';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = trainingRegistrationSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json<ApiError>(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const session = getSessionById(result.data.sessionId);
  if (!session) {
    return NextResponse.json<ApiError>({ error: 'Session not found' }, { status: 404 });
  }
  if (session.status !== 'OPEN') {
    return NextResponse.json<ApiError>(
      { error: 'Session is not open for registration' },
      { status: 409 },
    );
  }

  // Fire-and-forget — the email is the record
  if (session.program) {
    Promise.all([
      sendTrainingRegistrationConfirmation(
        result.data.email,
        result.data.name,
        session.program.title,
        new Date(session.startDate),
        session.venue ?? session.location,
        session.fee,
      ).catch(console.error),
      sendTrainingRegistrationNotification(result.data, session).catch(console.error),
    ]);
  }

  return NextResponse.json({ data: { success: true } }, { status: 201 });
}
