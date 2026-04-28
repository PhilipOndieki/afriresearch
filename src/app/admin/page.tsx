import { db } from '@/lib/db';
import { FadeUp } from '@/components/animations/FadeUp';

export const dynamic = 'force-dynamic';

async function getStats() {
  const [projects, enquiries, team, programs] = await Promise.all([
    db.project.count({ where: { status: 'PUBLISHED' } }),
    db.enquiry.count({ where: { status: 'NEW' } }),
    db.teamMember.count({ where: { isActive: true } }),
    db.trainingProgram.count({ where: { isActive: true } }),
  ]);
  return { projects, enquiries, team, programs };
}

async function getRecentEnquiries() {
  return db.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 });
}

export default async function AdminDashboardPage() {
  const [stats, recent] = await Promise.all([getStats(), getRecentEnquiries()]);

  const statCards = [
    { label: 'Published Projects', value: stats.projects, href: '/admin/projects' },
    {
      label: 'New Enquiries',
      value: stats.enquiries,
      href: '/admin/enquiries',
      highlight: stats.enquiries > 0,
    },
    { label: 'Team Members', value: stats.team, href: '/admin/team' },
    { label: 'Active Programmes', value: stats.programs, href: '/admin/training' },
  ];

  return (
    <div>
      <FadeUp>
        <h1 className="font-serif text-display-md text-foreground mb-8">Dashboard</h1>
      </FadeUp>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
        {statCards.map((card, i) => (
          <FadeUp key={card.label} delay={i * 0.05}>
            <a
              href={card.href}
              className={`block p-6 border transition-colors duration-200 hover:border-foreground ${card.highlight ? 'border-accent bg-accent/5' : 'border-border bg-background'}`}
            >
              <p className="font-serif text-display-lg text-foreground leading-none">
                {card.value}
              </p>
              <p className="font-sans text-label-sm uppercase tracking-widest text-muted mt-2">
                {card.label}
              </p>
            </a>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.2}>
        <h2 className="font-serif text-display-sm text-foreground mb-4">Recent Enquiries</h2>
        <div className="border border-border divide-y divide-border">
          {recent.length === 0 ? (
            <div className="p-6 text-center">
              <p className="font-sans text-body-sm text-muted">No enquiries yet.</p>
            </div>
          ) : (
            recent.map((e) => (
              <div key={e.id} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-sans text-body-sm text-foreground font-medium">{e.name}</p>
                  <p className="font-sans text-body-sm text-muted">{e.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-sans text-label-sm px-2 py-1 ${e.status === 'NEW' ? 'bg-accent text-background' : 'bg-surface text-muted'}`}
                  >
                    {e.status}
                  </span>
                  <a
                    href={`/admin/enquiries`}
                    className="font-sans text-label-sm text-muted hover:text-foreground transition-colors"
                  >
                    View
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </FadeUp>
    </div>
  );
}
