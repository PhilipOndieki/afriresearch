'use client';

import { useState } from 'react';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { enquirySchema } from '@/schemas/enquiry.schema';
import { cn } from '@/utils/cn';

const SERVICE_OPTIONS = [
  { value: 'human-resource-management', label: 'Human Resource Management' },
  { value: 'research-consultancy',      label: 'Research and Consultancy' },
  { value: 'architectural-design',      label: 'Architectural Design' },
  { value: 'training-capacity-building', label: 'Training and Capacity Building' },
  { value: 'project-supervision',        label: 'Project Supervision' },
  { value: 'other',                      label: 'Other' },
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  organization: string;
  serviceInterest: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

export function EnquiryForm({ className }: { className?: string }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    serviceInterest: '',
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = enquirySchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormState;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        organization: '',
        serviceInterest: '',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="label-text mb-4 text-accent">Message sent</p>
        <h3 className="font-serif text-display-sm text-foreground mb-4">
          Thank you for reaching out.
        </h3>
        <p className="font-sans text-body-md text-muted">
          We will respond within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          label="Name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your full name"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="your@email.com"
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+254 7XX XXX XXX"
        />
        <FormField
          label="Organisation"
          name="organization"
          value={form.organization}
          onChange={handleChange}
          error={errors.organization}
          placeholder="Company or institution"
        />
      </div>
      <FormField
        label="Service Interest"
        name="serviceInterest"
        type="select"
        value={form.serviceInterest}
        onChange={handleChange}
        options={SERVICE_OPTIONS}
      />
      <FormField
        label="Message"
        name="message"
        type="textarea"
        required
        value={form.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Tell us about your project or enquiry..."
      />

      {status === 'error' && (
        <p className="font-sans text-body-sm text-red-500">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" variant="outline" loading={status === 'loading'} className="w-full sm:w-auto">
        Send Enquiry
      </Button>
    </form>
  );
}
