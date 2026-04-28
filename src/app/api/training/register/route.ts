import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trainingRegistrationSchema } from '@/schemas/training.schema';
import { sendTrainingRegistrationConfirmation } from '@/lib/email';
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

  const session = await db.trainingSession.findUnique({
    where: { id: result.data.sessionId },
    include: { program: true, _count: { select: { registrations: true } } },
  });

  if (!session) {
    return NextResponse.json<ApiError>({ error: 'Session not found' }, { status: 404 });
  }
  if (session.status !== 'OPEN') {
    return NextResponse.json<ApiError>(
      { error: 'Session is not open for registration' },
      { status: 409 },
    );
  }
  if (session._count.registrations >= session.capacity) {
    await db.trainingSession.update({ where: { id: session.id }, data: { status: 'FULL' } });
    return NextResponse.json<ApiError>({ error: 'Session is fully booked' }, { status: 409 });
  }

  const registration = await db.trainingRegistration.create({ data: result.data });

  if (session.program) {
    sendTrainingRegistrationConfirmation(
      result.data.email,
      result.data.name,
      session.program.title,
      session.startDate,
      session.venue ?? session.location,
      Number(session.fee),
    ).catch(console.error);
  }

  return NextResponse.json({ data: registration }, { status: 201 });
}
