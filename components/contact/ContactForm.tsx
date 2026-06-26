"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Project enquiry — Sun Prime Energy Solutions");
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name")}`,
        `Company: ${data.get("company")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `Site location: ${data.get("location")}`,
        `Capability: ${data.get("capability")}`,
        `Approx. capacity: ${data.get("capacity")}`,
        `Timeline: ${data.get("timeline")}`,
        ``,
        `Project context:`,
        `${data.get("notes")}`,
      ].join("\n"),
    );
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-px overflow-hidden rounded-sm bg-line">
      <div className="grid gap-px md:grid-cols-2">
        <Field name="name" label="Full name" required />
        <Field name="company" label="Company" required />
        <Field name="email" type="email" label="Work email" required />
        <Field name="phone" label="Phone" />
      </div>
      <Field name="location" label="Site location (city, state)" />

      <div className="grid gap-px md:grid-cols-2">
        <SelectField
          name="capability"
          label="Capability of interest"
          options={[
            "Rooftop Solar",
            "EPC & Turnkey Execution",
            "Operations & Maintenance",
            "Advisory & Compliance",
            "Not sure yet",
          ]}
        />
        <SelectField
          name="capacity"
          label="Approx. capacity"
          options={[
            "Under 100 kWp",
            "100 – 500 kWp",
            "500 kWp – 1 MWp",
            "1 – 5 MWp",
            "Over 5 MWp",
          ]}
        />
      </div>

      <SelectField
        name="timeline"
        label="Decision timeline"
        options={["Within 1 month", "1 – 3 months", "3 – 6 months", "Exploring"]}
      />

      <Textarea name="notes" label="Project context (optional)" />

      <div className="flex flex-col items-start justify-between gap-3 bg-paper p-5 md:flex-row md:items-center md:p-6">
        <p className="text-[12px] text-ink/45">
          {submitted ? "Opening your mail client…" : "We respond within 1 business day."}
        </p>
        <Button variant="primary" showArrow>
          Send enquiry
        </Button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block bg-paper p-5 transition-colors focus-within:bg-mist md:p-6">
      <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45">
        {label}
        {required && <span className="ml-1 text-amber">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full bg-transparent text-[15px] text-ink placeholder:text-ink/30 focus:outline-none"
      />
    </label>
  );
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: string[];
}) {
  return (
    <label className="block bg-paper p-5 transition-colors focus-within:bg-mist md:p-6">
      <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full appearance-none bg-transparent text-[15px] text-ink focus:outline-none"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ name, label }: { name: string; label: string }) {
  return (
    <label className="block bg-paper p-5 transition-colors focus-within:bg-mist md:p-6">
      <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45">
        {label}
      </span>
      <textarea
        name={name}
        rows={4}
        className="mt-2 w-full resize-none bg-transparent text-[15px] text-ink placeholder:text-ink/30 focus:outline-none"
      />
    </label>
  );
}
