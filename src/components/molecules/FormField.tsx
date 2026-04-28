import { cn } from '@/utils/cn';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';

type FormFieldProps = {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => void;
  options?: { value: string; label: string }[];
  className?: string;
};

export function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  error,
  value,
  onChange,
  options,
  className,
}: FormFieldProps) {
  const id = `field-${name}`;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="label-text text-foreground">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          error={error}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}
          className={cn(
            'w-full px-4 py-3 bg-background border font-sans text-body-md text-foreground transition-colors duration-300 outline-none appearance-none',
            error ? 'border-red-500' : 'border-border focus:border-foreground',
          )}
        >
          <option value="">Select an option</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          error={error}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        />
      )}

      {error && <p className="font-sans text-body-sm text-red-500">{error}</p>}
    </div>
  );
}
