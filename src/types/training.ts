export type SessionStatus = 'OPEN' | 'FULL' | 'CANCELLED' | 'COMPLETED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export type TrainingProgram = {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  targetGroup: string;
  heroImage: string;
  isActive: boolean;
  createdAt: string;
  sessions?: TrainingSession[];
};

export type TrainingSession = {
  id: number;
  programId: number;
  startDate: string;
  endDate: string;
  location: string;
  venue: string | null;
  fee: number;
  currency: string;
  capacity: number;
  status: SessionStatus;
  program?: TrainingProgram;
  _count?: { registrations: number };
};

export type TrainingRegistration = {
  id: number;
  sessionId: number;
  name: string;
  email: string;
  phone: string;
  organization: string | null;
  paymentStatus: PaymentStatus;
  paymentRef: string | null;
  createdAt: string;
};
