import LoginForm from "./LoginForm";

export const metadata = { title: "Admin sign in", robots: { index: false } };

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-sm">
        <p className="eyebrow mb-2">SPAN Admin</p>
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}
