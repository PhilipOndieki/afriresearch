import Image from 'next/image';
import { db } from '@/lib/db';
import { FadeUp } from '@/components/animations/FadeUp';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const members = await db.teamMember.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-display-md text-foreground">Team</h1>
        <a href="/admin/team/new" className="btn-primary text-sm">
          Add Member
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {members.map((member, i) => (
          <FadeUp key={member.id} delay={i * 0.05}>
            <div className="border border-border p-4 flex gap-4">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-surface rounded-full">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-body-sm text-foreground font-medium">{member.name}</p>
                <p className="font-sans text-body-sm text-muted">{member.role}</p>
                <div className="flex gap-3 mt-2">
                  <span
                    className={`font-sans text-label-sm px-2 py-0.5 ${member.isActive ? 'bg-surface text-foreground' : 'bg-muted/20 text-muted'}`}
                  >
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <a
                    href={`/admin/team/${member.id}`}
                    className="font-sans text-label-sm text-accent hover:underline"
                  >
                    Edit
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
