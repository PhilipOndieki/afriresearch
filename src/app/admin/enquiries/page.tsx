'use client';

import { useState } from 'react';
import { useEnquiries } from '@/hooks/useEnquiries';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { formatDate } from '@/utils/formatDate';
import type { EnquiryStatus } from '@/types/enquiry';
import { cn } from '@/utils/cn';

const statusOptions: EnquiryStatus[] = ['NEW', 'READ', 'REPLIED', 'CLOSED'];

const statusBadge: Record<EnquiryStatus, 'accent' | 'default' | 'outline' | 'muted'> = {
  NEW: 'accent',
  READ: 'default',
  REPLIED: 'outline',
  CLOSED: 'muted',
};

export default function AdminEnquiriesPage() {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const { enquiries, loading, setEnquiries } = useEnquiries(filter);
  const [selected, setSelected] = useState<number | null>(null);

  const selectedEnquiry = enquiries.find((e) => e.id === selected);

  const updateStatus = async (id: number, status: EnquiryStatus) => {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
  };

  return (
    <div>
      <h1 className="font-serif text-display-md text-foreground mb-6">Enquiries</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter(undefined)}
          className={cn(
            'font-sans text-label-sm px-3 py-1 border transition-colors',
            !filter
              ? 'bg-foreground text-background border-foreground'
              : 'border-border text-muted hover:border-foreground',
          )}
        >
          All
        </button>
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'font-sans text-label-sm px-3 py-1 border transition-colors',
              filter === s
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted hover:border-foreground',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* List */}
        <div className="border border-border divide-y divide-border">
          {loading ? (
            <div className="p-8 text-center">
              <p className="font-sans text-body-sm text-muted">Loading...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center">
              <p className="font-sans text-body-sm text-muted">No enquiries found.</p>
            </div>
          ) : (
            enquiries.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                className={cn(
                  'w-full text-left p-4 flex items-start justify-between gap-4 transition-colors duration-150',
                  selected === e.id ? 'bg-surface' : 'hover:bg-surface/50',
                )}
              >
                <div className="min-w-0">
                  <p className="font-sans text-body-sm text-foreground font-medium truncate">
                    {e.name}
                  </p>
                  <p className="font-sans text-body-sm text-muted truncate">{e.email}</p>
                  <p className="font-sans text-body-sm text-muted mt-1 line-clamp-1">{e.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <Badge variant={statusBadge[e.status]}>{e.status}</Badge>
                  <span className="font-sans text-label-sm text-muted">
                    {formatDate(e.createdAt, 'short')}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Detail */}
        {selectedEnquiry ? (
          <div className="border border-border p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-display-sm text-foreground">
                  {selectedEnquiry.name}
                </h3>
                <p className="font-sans text-body-sm text-muted">
                  {formatDate(selectedEnquiry.createdAt)}
                </p>
              </div>
              <Badge variant={statusBadge[selectedEnquiry.status]}>{selectedEnquiry.status}</Badge>
            </div>
            <div className="space-y-3 border-t border-border pt-4">
              <p className="font-sans text-body-sm">
                <span className="text-muted">Email:</span>{' '}
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-foreground hover:text-accent"
                >
                  {selectedEnquiry.email}
                </a>
              </p>
              {selectedEnquiry.phone && (
                <p className="font-sans text-body-sm">
                  <span className="text-muted">Phone:</span> {selectedEnquiry.phone}
                </p>
              )}
              {selectedEnquiry.organization && (
                <p className="font-sans text-body-sm">
                  <span className="text-muted">Organisation:</span> {selectedEnquiry.organization}
                </p>
              )}
              {selectedEnquiry.serviceInterest && (
                <p className="font-sans text-body-sm">
                  <span className="text-muted">Service:</span> {selectedEnquiry.serviceInterest}
                </p>
              )}
            </div>
            <div className="border-t border-border pt-4">
              <p className="font-sans text-body-sm text-muted mb-2">Message</p>
              <p className="font-sans text-body-md text-foreground whitespace-pre-wrap">
                {selectedEnquiry.message}
              </p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="font-sans text-label-sm text-muted mb-3 uppercase tracking-widest">
                Update status
              </p>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={selectedEnquiry.status === s ? 'primary' : 'outline'}
                    onClick={() => updateStatus(selectedEnquiry.id, s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-border flex items-center justify-center p-12 text-center">
            <p className="font-sans text-body-sm text-muted">Select an enquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
