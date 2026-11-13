"use client";

// SEO assistant: live length meters for the meta title and description with
// ideal-range colouring, plus a Google-style search-result preview. Drop it
// under the title/description fields in any editor tab.

import { site } from "@/data/site";

function meter(len: number, min: number, ideal: number, max: number) {
  // returns [color, label]
  if (len === 0) return ["text-neutral-400", "empty"] as const;
  if (len > max) return ["text-red-600", "too long"] as const;
  if (len < min) return ["text-amber-600", "too short"] as const;
  if (len <= ideal) return ["text-green-600", "good"] as const;
  return ["text-amber-600", "a bit long"] as const;
}

function Bar({ len, max }: { len: number; max: number }) {
  const pct = Math.min(100, (len / max) * 100);
  const color = len > max ? "bg-red-500" : len > max * 0.9 ? "bg-amber-500" : "bg-green-500";
  return (
    <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-neutral-200">
      <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function SeoMeters({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path?: string;
}) {
  const t = title.length;
  const d = description.length;
  const [tColor, tLabel] = meter(t, 30, 60, 65);
  const [dColor, dLabel] = meter(d, 70, 155, 165);

  const prettyUrl = `${site.url.replace(/^https?:\/\//, "")}${path && path !== "/" ? path : ""}`;

  return (
    <div className="mt-2 space-y-3 rounded-md border border-neutral-200 bg-neutral-50 p-3">
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-neutral-500">Title length</span>
            <span className={tColor}>{t} · {tLabel}</span>
          </div>
          <Bar len={t} max={65} />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-neutral-500">Description length</span>
            <span className={dColor}>{d} · {dLabel}</span>
          </div>
          <Bar len={d} max={165} />
        </div>
      </div>

      {/* Google-style preview */}
      <div className="rounded-md border border-neutral-200 bg-white p-3">
        <div className="text-[11px] uppercase tracking-wide text-neutral-400">Google preview</div>
        <div className="mt-1.5 truncate text-[12px] text-[#4d5156]">{prettyUrl}</div>
        <div className="truncate text-[18px] leading-tight text-[#1a0dab]">
          {title || "Your page title appears here"}
        </div>
        <div className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-[#4d5156]">
          {description || "Your meta description preview appears here — aim for a clear, compelling summary around 150 characters."}
        </div>
      </div>
    </div>
  );
}
