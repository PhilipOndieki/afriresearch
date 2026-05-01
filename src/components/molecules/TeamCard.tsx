import Image from 'next/image';
import { cn } from '@/utils/cn';
import type { TeamMember } from '@/types/api';

type TeamCardProps = {
  member: TeamMember;
  className?: string;
};

export function TeamCard({ member, className }: TeamCardProps) {
  return (
    <div className={cn('group', className)}>
      <div className="relative aspect-portrait overflow-hidden mb-4 bg-surface">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-800 ease-expo-out group-hover:scale-105"
        />
      </div>
      <h3 className="font-serif text-display-sm text-foreground mb-1">{member.name}</h3>
      <p className="label-text mb-3">{member.role}</p>
      {/* Bumped from text-body-sm — bio is substantive copy */}
      <p className="font-sans text-body-md text-muted line-clamp-4">{member.bio}</p>
    </div>
  );
}
