import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { db } from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST ?? 'smtp.resend.com',
        port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
        auth: {
          user: process.env.EMAIL_SERVER_USER ?? 'resend',
          pass: process.env.RESEND_API_KEY ?? '',
        },
      },
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@insightafriresearch.com',
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.email = user.email;
      }
      return session;
    },
  },
  session: {
    strategy: 'database',
  },
};
