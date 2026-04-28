import Link from 'next/link';
import { Badge } from '@/components/atoms/Badge';
import { FadeUp } from '@/components/animations/FadeUp';
import { formatDateRange } from '@/utils/formatDate';
import type { TrainingSession } from '@/types/training';

type TrainingCalendarProps = {
  sessions: TrainingSession[];
};

const statusBadge: Record<string, 'default' | 'accent' | 'muted'> = {
  OPEN: 'default',
  FULL: 'muted',
  CANCELLED: 'muted',
  COMPLETED: 'muted',
};

export function TrainingCalendar({ sessions }: TrainingCalendarProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-sans text-body-lg text-muted">No upcoming sessions. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border">
      {sessions.map((session, i) => (
        <FadeUp key={session.id} delay={i * 0.05}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 py-6 items-start">
            <div>
              <p className="label-text mb-1">
                {formatDateRange(session.startDate, session.endDate)}
              </p>
              <h3 className="font-serif text-display-sm text-foreground mb-1">
                {session.program?.title}
              </h3>
              <p className="font-sans text-body-sm text-muted">
                {session.venue ?? session.location} &middot; {session.program?.duration}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <Badge variant={statusBadge[session.status]}>{session.status}</Badge>
              <p className="font-sans text-body-sm text-foreground font-medium">
                KES {Number(session.fee).toLocaleString()}
              </p>
              {session.status === 'OPEN' && (
                <Link href={`/training#register-${session.id}`} className="btn-text text-sm">
                  Register now
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
