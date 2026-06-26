import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "narrow";
};

export function Container({ size = "default", className, ...rest }: Props) {
  const max =
    size === "wide" ? "max-w-[1400px]" : size === "narrow" ? "max-w-[880px]" : "max-w-[1240px]";
  return <div className={cn("mx-auto w-full px-6 md:px-10", max, className)} {...rest} />;
}
