import { db } from '@/lib/db';
import { Badge } from '@/components/atoms/Badge';
import { FadeUp } from '@/components/animations/FadeUp';
import { formatDateRange } from '@/utils/formatDate';

export const dynamic = 'force-dynamic';

export default async function AdminTrainingPage() {
  const [programs, sessions] = await Promise.all([
    db.trainingProgram.findMany({ orderBy: { title: 'asc' } }),
    db.trainingSession.findMany({
      include: { program: true, _count: { select: { registrations: true } } },
      orderBy: { startDate: 'asc' },
    }),
  ]);

  return (
    <div className="space-y-10">
      {/* Programs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-display-md text-foreground">Training</h1>
          <a href="/admin/training/new" className="btn-primary text-sm">
            New Programme
          </a>
        </div>
        <div className="border border-border divide-y divide-border">
          {programs.map((p) => (
            <div key={p.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-sans text-body-sm text-foreground font-medium">{p.title}</p>
                <p className="font-sans text-body-sm text-muted">
                  {p.duration} &middot; {p.targetGroup}
                </p>
              </div>
              <Badge variant={p.isActive ? 'default' : 'muted'}>
                {p.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Sessions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-display-sm text-foreground">Sessions</h2>
          <a href="/admin/training/sessions/new" className="btn-outline text-sm">
            Add Session
          </a>
        </div>
        <div className="border border-border divide-y divide-border">
          {sessions.map((s, i) => (
            <FadeUp key={s.id} delay={i * 0.03}>
              <div className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-sans text-body-sm text-foreground font-medium">
                    {s.program?.title}
                  </p>
                  <p className="font-sans text-body-sm text-muted">
                    {formatDateRange(s.startDate, s.endDate)}
                  </p>
                  <p className="font-sans text-body-sm text-muted">{s.venue ?? s.location}</p>
                </div>
                <div className="flex items-center gap-4 text-right shrink-0">
                  <div>
                    <p className="font-sans text-label-sm text-muted">Registrations</p>
                    <p className="font-sans text-body-sm text-foreground">
                      {s._count.registrations} / {s.capacity}
                    </p>
                  </div>
                  <Badge variant={s.status === 'OPEN' ? 'default' : 'muted'}>{s.status}</Badge>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
}
