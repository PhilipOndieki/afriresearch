'use client';

import { useState } from 'react';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { trainingRegistrationSchema } from '@/schemas/training.schema';
import type { TrainingSession } from '@/types/training';
import { formatDateRange } from '@/utils/formatDate';

type RegistrationFormProps = {
  sessions: TrainingSession[];
};

export function RegistrationForm({ sessions }: RegistrationFormProps) {
  const [form, setForm] = useState({
    sessionId: '',
    name: '',
    email: '',
    phone: '',
    organization: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const sessionOptions = sessions
    .filter((s) => s.status === 'OPEN')
    .map((s) => ({
      value: String(s.id),
      label: `${s.program?.title} — ${formatDateRange(s.startDate, s.endDate)}`,
    }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, sessionId: Number(form.sessionId) };
    const result = trainingRegistrationSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/training/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12 border border-border">
        <p className="label-text mb-4 text-accent">Registration received</p>
        <h3 className="font-serif text-display-sm text-foreground mb-4">You are on the list.</h3>
        <p className="font-sans text-body-md text-muted">
          We will send payment instructions to your email within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <FormField
        label="Session"
        name="sessionId"
        type="select"
        required
        value={form.sessionId}
        onChange={handleChange}
        error={errors.sessionId}
        options={sessionOptions}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          required
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormField
          label="Organisation"
          name="organization"
          value={form.organization}
          onChange={handleChange}
        />
      </div>
      {status === 'error' && (
        <p className="font-sans text-body-sm text-red-500">
          Registration failed. Please try again.
        </p>
      )}
      <Button type="submit" loading={status === 'loading'}>
        Register Now
      </Button>
    </form>
  );
}
