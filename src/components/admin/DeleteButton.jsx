"use client";

export default function DeleteButton({ action, label = "Delete", confirmText = "Delete this item? This cannot be undone." }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-sm font-medium text-destructive hover:underline focus-ring rounded-sm">
        {label}
      </button>
    </form>
  );
}
