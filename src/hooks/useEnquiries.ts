'use client';

import { useState, useEffect } from 'react';
import type { Enquiry } from '@/types/enquiry';

export function useEnquiries(status?: string) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set('status', status);

    setLoading(true);
    fetch(`/api/enquiries?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch enquiries');
        return res.json();
      })
      .then((json) => {
        setEnquiries(json.data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [status]);

  return { enquiries, loading, error, setEnquiries };
}
