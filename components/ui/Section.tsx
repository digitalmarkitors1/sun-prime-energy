import { cn } from "@/lib/cn";

type Tone = "mist" | "paper" | "ink" | "sky" | "sun" | "leaf";
type Props = React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  bordered?: boolean;
  size?: "default" | "tight" | "loose";
};

const toneClass: Record<Tone, string> = {
  mist: "bg-mist text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-night text-mist",
  // Soft coloured washes — light bases so each section's own gradient
  // accents and dark (text-ink) content stay legible on top.
  sky: "bg-bluemist text-ink",
  sun: "bg-cream text-ink",
  leaf: "bg-leaf text-ink",
};

export function Section({
  tone = "mist",
  bordered = false,
  size = "default",
  className,
  ...rest
}: Props) {
  const py =
    size === "tight"
      ? "py-10 md:py-12"
      : size === "loose"
      ? "py-14 md:py-20"
      : "py-12 md:py-16";
  return (
    <section
      className={cn(
        toneClass[tone],
        py,
        bordered && "border-y border-line",
        className,
      )}
      {...rest}
    />
  );
}
