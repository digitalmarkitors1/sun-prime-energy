import { cn } from "@/lib/cn";

type Tone = "mist" | "paper" | "ink";
type Props = React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  bordered?: boolean;
  size?: "default" | "tight" | "loose";
};

const toneClass: Record<Tone, string> = {
  mist: "bg-mist text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-mist",
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
      ? "py-12 md:py-16"
      : size === "loose"
      ? "py-20 md:py-28"
      : "py-16 md:py-24";
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
