"use client";

import { useFormStatus } from "react-dom";

const inputClass =
  "w-full px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm focus-ring";

export function Field({ label, name, hint, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-primary mb-1">
        {label}
      </label>
      <input id={name} name={name} className={inputClass} {...props} />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function TextArea({ label, name, hint, rows = 4, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-primary mb-1">
        {label}
      </label>
      <textarea id={name} name={name} rows={rows} className={`${inputClass} resize-y`} {...props} />
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Select({ label, name, options, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-primary mb-1">
        {label}
      </label>
      <select id={name} name={name} className={inputClass} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Checkbox({ label, name, defaultChecked }) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-[hsl(var(--secondary))]" />
      {label}
    </label>
  );
}

export function SubmitButton({ children = "Save", pendingLabel = "Saving..." }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-5 py-2.5 rounded-md text-sm font-semibold hover:brightness-110 transition-all focus-ring disabled:opacity-60"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export function FormError({ state }) {
  if (!state?.error) return null;
  return (
    <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
      {state.error}
    </p>
  );
}

// Default values for a form: the last submitted values after a failed save, else the saved record.
export function formDefaults(state, record = {}) {
  const v = state?.values;
  return {
    text: (name, fallback = record[name]) => (v ? v[name] ?? "" : fallback ?? ""),
    checked: (name, fallback = record[name]) => (v ? v[name] === "on" : fallback),
  };
}
