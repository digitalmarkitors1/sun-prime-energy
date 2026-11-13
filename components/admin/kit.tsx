"use client";

import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

/** Warn before leaving the page while there are unsaved changes. */
export function useUnsavedGuard(dirty: boolean) {
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);
}

export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
  size = "md",
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  size?: "sm" | "md";
  title?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-2.5 py-1 text-xs", md: "px-4 py-2 text-sm" };
  const variants = {
    primary: "bg-amber-600 text-white hover:bg-amber-700",
    ghost: "border border-neutral-300 text-neutral-700 hover:bg-neutral-100",
    danger: "border border-red-300 text-red-600 hover:bg-red-50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral-500">
      <Loader2 className="animate-spin" size={16} /> {label ?? "Loading…"}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-neutral-600">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-neutral-400">{hint}</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
    />
  );
}

/** Sticky footer bar with a save button + status message. */
export function SaveBar({
  onSave,
  saving,
  status,
  dirty,
}: {
  onSave: () => void;
  saving: boolean;
  status: string | null;
  dirty: boolean;
}) {
  return (
    <div className="sticky bottom-0 z-10 mt-6 flex items-center justify-between gap-4 border-t border-neutral-200 bg-white/90 px-1 py-3 backdrop-blur">
      <span className="text-xs text-neutral-500">
        {status ?? (dirty ? "Unsaved changes" : "All changes saved")}
      </span>
      <Btn onClick={onSave} disabled={saving || !dirty}>
        {saving ? <Loader2 className="animate-spin" size={15} /> : null}
        {saving ? "Saving…" : "Save changes"}
      </Btn>
    </div>
  );
}
