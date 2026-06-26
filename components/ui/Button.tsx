import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "amber";

type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "group relative inline-flex items-center gap-2 px-5 py-3 text-[13.5px] font-medium tracking-tight transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-mist hover:bg-ink-soft rounded-full",
  amber:
    "bg-amber text-paper hover:bg-amber-bright rounded-full",
  secondary:
    "bg-transparent text-ink ring-1 ring-inset ring-ink/15 hover:ring-ink/40 rounded-full",
  ghost:
    "bg-transparent text-ink hover:text-amber rounded-full px-2",
};

export function Button({
  href,
  variant = "primary",
  className,
  children,
  showArrow = false,
  external,
  ...rest
}: Props) {
  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  const cls = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a className={cls} href={href} target="_blank" rel="noreferrer noopener">
          {content}
        </a>
      );
    }
    return (
      <Link className={cls} href={href}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
