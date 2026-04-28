export type ApiSuccess<T> = {
  data: T;
  meta?: {
    total?: number;
    nextCursor?: number | null;
    hasMore?: boolean;
  };
};

export type ApiError = {
  error: string;
  details?: Record<string, string[]>;
};

export type PaginationParams = {
  cursor?: number;
  limit?: number;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo: string;
  email: string | null;
  linkedin: string | null;
  sortOrder: number;
  isActive: boolean;
};
