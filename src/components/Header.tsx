"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { getWhatsappLink } from "@/config/site";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre mim" },
  { href: "#acompanhamento", label: "Acompanhamento" },
  { href: "#pre-consulta", label: "Pré-consulta" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-cream/95 shadow-[0_1px_0_0_rgba(28,34,29,0.08)] backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link
          href="#inicio"
          className="focus-ring flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-jp.png"
            alt="Júlia Pinheiro"
            width={34}
            height={51}
            className="h-9 w-auto"
            priority
          />
          <span className="font-serif text-[1.05rem] font-semibold leading-none tracking-wide text-green">
            Júlia Pinheiro
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring text-sm font-medium text-ink-soft transition-colors hover:text-green"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href="/biblioteca/login"
            className="focus-ring text-sm font-medium text-ink-soft transition-colors hover:text-green"
          >
            Área do paciente
          </Link>
          <a
            href={getWhatsappLink("agendar")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-green-deep"
          >
            Agendar consulta
          </a>
        </div>

        <Link
          href="/biblioteca/login"
          className="focus-ring whitespace-nowrap rounded-full border border-green/25 px-3 py-1.5 text-[11px] font-semibold text-green lg:hidden"
        >
          Menu do paciente
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="focus-ring relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={cn(
              "h-px w-6 bg-green transition-transform duration-300",
              open && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-6 bg-green transition-all duration-300",
              open && "-rotate-45 -translate-y-[3.5px]"
            )}
          />
        </button>
      </div>

      <div
        inert={!open}
        className={cn(
          "fixed inset-0 top-0 z-40 flex flex-col bg-cream transition-opacity duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="mt-28 flex flex-1 flex-col items-center justify-center gap-8 px-6">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={cn(
                "font-serif text-3xl text-green transition-all duration-300",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              )}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/biblioteca/login"
            onClick={() => setOpen(false)}
            className="font-serif text-3xl text-green"
          >
            Área do paciente
          </Link>
          <a
            href={getWhatsappLink("agendar")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="focus-ring mt-4 rounded-full bg-green px-7 py-3 text-sm font-semibold text-cream"
          >
            Agendar consulta
          </a>
        </nav>
      </div>
    </header>
  );
}
