'use client';

import { useState, useEffect } from 'react';
import type { ProjectWithRelations } from '@/types/project';

type UseProjectsOptions = {
  category?: string | null;
  limit?: number;
};

export function useProjects({ category, limit = 20 }: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    params.set('limit', String(limit));

    setLoading(true);
    fetch(`/api/projects?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then((json) => {
        setProjects(json.data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [category, limit]);

  return { projects, loading, error };
}
