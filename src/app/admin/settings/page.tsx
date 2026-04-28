'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { FormField } from '@/components/molecules/FormField';

const SETTING_LABELS: Record<string, string> = {
  site_tagline: 'Site Tagline',
  phone_main: 'Main Phone Number',
  phone_mobile: 'Mobile Number',
  email: 'Contact Email',
  address: 'Office Address',
  registration_number: 'Business Registration',
  nca_registration: 'NCA Registration',
  aak_membership: 'AAK Membership Number',
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((json) => {
        setSettings(json.data ?? {});
        setLoading(false);
      });
  }, []);

  const handleChange =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setSettings((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="font-sans text-body-sm text-muted">Loading settings...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-display-md text-foreground mb-6">Settings</h1>
      <form onSubmit={handleSave} className="max-w-xl space-y-5">
        {Object.entries(SETTING_LABELS).map(([key, label]) => (
          <FormField
            key={key}
            label={label}
            name={key}
            value={settings[key] ?? ''}
            onChange={handleChange(key)}
          />
        ))}
        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" loading={saving}>
            Save Settings
          </Button>
          {saved && <p className="font-sans text-body-sm text-accent">Saved.</p>}
        </div>
      </form>
    </div>
  );
}
