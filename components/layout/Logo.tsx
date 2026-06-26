import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  /**
   * Kept for API compatibility with Header/Footer; the logo image carries its own colors,
   * so tone has no visual effect.
   */
  tone?: "ink" | "mist";
  className?: string;
  /** "default" → header size · "lg" → footer size */
  size?: "default" | "lg";
};

export function Logo({ className, size = "default" }: Props) {
  const heightClass =
    size === "lg" ? "h-14 md:h-16" : "h-10 md:h-12";

  return (
    <Link
      href="/"
      aria-label="Sun Prime Energy Solutions — Home"
      className={cn("inline-flex items-center transition-opacity hover:opacity-90", className)}
    >
      <Image
        src="/logo.png"
        alt="Sun Prime Energy Solutions — Energy Efficiency, Solar, Consultancy"
        width={600}
        height={396}
        priority
        className={cn("w-auto", heightClass)}
      />
    </Link>
  );
}
