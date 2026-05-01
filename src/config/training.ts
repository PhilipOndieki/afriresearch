import type { TrainingProgram, TrainingSession } from '@/types/training';

export const programs: TrainingProgram[] = [
  {
    id: 1,
    slug: 'construction-project-management',
    title: 'Construction Project Management',
    description:
      'A practical five-day programme covering project planning, procurement, site supervision, quality control, and cost management. Designed for site engineers, project coordinators, and quantity surveyors who want to sharpen their project management skills.',
    duration: '5 days',
    targetGroup: 'Site Engineers, Project Coordinators, Quantity Surveyors',
    heroImage:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=85&auto=format&fit=crop',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    slug: 'building-inspection-certification',
    title: 'Building Inspection and Certification',
    description:
      'A three-day certification course covering building codes, inspection methodologies, documentation, and compliance reporting under Kenyan law. Targeted at county government inspectors and private building surveyors.',
    duration: '3 days',
    targetGroup: 'County Building Inspectors, Building Surveyors',
    heroImage:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=85&auto=format&fit=crop',
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
];

export const sessions: TrainingSession[] = [
  {
    id: 1,
    programId: 1,
    startDate: '2025-07-07T00:00:00.000Z',
    endDate: '2025-07-11T00:00:00.000Z',
    location: 'Nairobi, Kenya',
    venue: 'Hughes Building Conference Room, Kenyatta Avenue',
    fee: 45000,
    currency: 'KES',
    capacity: 25,
    status: 'OPEN',
    program: programs[0],
  },
  {
    id: 2,
    programId: 2,
    startDate: '2025-07-21T00:00:00.000Z',
    endDate: '2025-07-23T00:00:00.000Z',
    location: 'Nairobi, Kenya',
    venue: 'Hughes Building Conference Room, Kenyatta Avenue',
    fee: 28000,
    currency: 'KES',
    capacity: 20,
    status: 'OPEN',
    program: programs[1],
  },
];

export function getSessionById(id: number): TrainingSession | undefined {
  return sessions.find((s) => s.id === id);
}

export function getActivePrograms(): TrainingProgram[] {
  return programs.filter((p) => p.isActive);
}

export function getUpcomingSessions(): TrainingSession[] {
  const now = new Date();
  return sessions.filter(
    (s) => (s.status === 'OPEN' || s.status === 'FULL') && new Date(s.startDate) >= now,
  );
}
