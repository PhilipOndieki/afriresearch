import type { Metadata } from 'next';
import { AdminShell } from '@/components/templates/AdminShell';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({ title: 'Admin', noIndex: true });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
