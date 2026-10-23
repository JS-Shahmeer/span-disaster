"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";
import { Field, FormError, SubmitButton } from "@/components/admin/fields";

export default function LoginForm() {
  const [state, action] = useActionState(loginAction, null);
  return (
    <form action={action} className="space-y-4">
      <FormError state={state} />
      <Field key={state?.email} label="Email" name="email" type="email" autoComplete="email" defaultValue={state?.email} required />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required />
      <SubmitButton pendingLabel="Signing in...">Sign in</SubmitButton>
    </form>
  );
}
