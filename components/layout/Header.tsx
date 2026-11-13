"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // On the home hero (dark video) at the top of the page, nav sits over dark footage
  const onHeroTop = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-mist/85 backdrop-blur-md border-b border-line"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Logo tone={onHeroTop ? "mist" : "ink"} />

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13.5px] font-medium transition-colors",
                onHeroTop
                  ? "text-mist/80 hover:text-white"
                  : "text-ink/70 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant={onHeroTop ? "amber" : "primary"} showArrow>
            Request a quote
          </Button>
        </div>

        <button
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
            onHeroTop ? "text-mist" : "text-ink",
          )}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu size={20} />
        </button>
      </Container>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-mist transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </Container>
        <Container>
          <nav className="mt-8 flex flex-col gap-1">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-5 text-2xl font-medium tracking-tight text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-10">
            <Button href="/contact" variant="primary" showArrow className="w-full justify-center">
              Request a quote
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
