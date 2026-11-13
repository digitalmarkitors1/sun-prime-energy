import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  /** "mist" → light/reverse logo for dark backgrounds · "ink" → full-colour logo (default) */
  tone?: "ink" | "mist";
  className?: string;
  /** "default" → header size · "lg" → footer size */
  size?: "default" | "lg";
};

export function Logo({ className, tone = "ink", size = "default" }: Props) {
  const heightClass =
    size === "lg" ? "h-16 md:h-20" : "h-12 md:h-16";
  const src = tone === "mist" ? "/logo-light.png" : "/logo.png";

  return (
    <Link
      href="/"
      aria-label="Sunprime Energy Solutions — Home"
      className={cn("inline-flex items-center transition-opacity hover:opacity-90", className)}
    >
      <Image
        src={src}
        alt="Sunprime Energy Solutions"
        width={701}
        height={521}
        priority
        className={cn("w-auto", heightClass)}
      />
    </Link>
  );
}
