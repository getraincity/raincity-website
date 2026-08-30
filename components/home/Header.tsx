"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { business, nav, social, type NavItem } from "@/lib/content";
import { photos, type PhotoKey } from "@/lib/photos";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  ChevronDown,
  Close,
  Mail,
  Menu,
  Phone,
  SocialIcon,
} from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";

export function Header() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [preview, setPreview] = useState<PhotoKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Condense the utility strip once the page starts moving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes whatever is open; clicking outside closes the dropdowns.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      setMobileOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock the page behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const toggle = useCallback((label: string) => {
    setOpenMenu((current) => (current === label ? null : label));
  }, []);

  return (
    <header
      ref={headerRef}
      className="on-navy sticky top-0 z-40 w-full"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Utility strip */}
      <div
        className={cn(
          "overflow-hidden bg-rc-blue text-white transition-[max-height] duration-300",
          scrolled ? "max-h-0" : "max-h-16",
        )}
      >
        {/* Contact on the left, social on the right. Hours stay in the footer
            so the strip reads as a contact line rather than a second nav. */}
        <div className="mx-auto flex max-w-site items-center gap-6 px-edge py-2">
          <a
            href={business.phoneHref}
            className="meta flex items-center gap-2 py-1 transition-colors duration-200 hover:text-amber"
          >
            <Phone className="shrink-0" />
            {business.phone}
          </a>
          <a
            href={business.emailHref}
            className="meta hidden items-center gap-2 py-1 transition-colors duration-200 hover:text-amber sm:flex"
          >
            <Mail className="shrink-0" />
            {business.email}
          </a>

          {/* Negative margin lets each target run wider than the icon without
              adding height to the strip. */}
          <ul className="-mr-1.5 ml-auto flex items-center">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="group inline-flex size-8 items-center justify-center text-white/75 transition-colors duration-200 hover:bg-white/15 hover:text-amber sm:size-9"
                >
                  <SocialIcon
                    name={s.icon}
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-px group-hover:scale-110 sm:size-4.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "bg-navy transition-shadow",
          scrolled && "border-b border-b-pacific/30",
        )}
      >
        {/* py-2.5 with a compact CTA puts the navy bar at 64px. It was 86px:
            py-4 either side of a 52px quote button, which made the button —
            not the logo or the nav — the thing setting the bar's height. */}
        <div className="mx-auto flex max-w-site items-center justify-between gap-6 px-edge py-2.5">
          <Logo tone="light" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  item={item}
                  open={openMenu === item.label}
                  onToggle={() => toggle(item.label)}
                  onOpen={() => setOpenMenu(item.label)}
                  preview={preview}
                  setPreview={setPreview}
                />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            {/* Wrapped rather than given `hidden` directly: the Button base
                carries `inline-flex`, which Tailwind emits after `hidden`, so
                the utility loses and the CTA renders on phones — pushing the
                bar past the viewport. The wrapper sidesteps that entirely. */}
            <span className="hidden sm:block">
              <Button href="#quote" size="compact" className="group">
                Get A Quote
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </span>
            <button
              type="button"
              className="-mr-2 inline-flex size-11 items-center justify-center text-white lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

/* -------------------------------------------------------------------------- */

function DesktopNavItem({
  item,
  open,
  onToggle,
  onOpen,
  preview,
  setPreview,
}: {
  item: NavItem;
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  preview: PhotoKey | null;
  setPreview: (p: PhotoKey | null) => void;
}) {
  const id = `menu-${item.label.toLowerCase()}`;
  const linkClass =
    "flex items-center gap-1 px-4 py-3 meta text-white hover:text-pacific transition-colors";

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkClass}>
          {item.label}
        </Link>
      </li>
    );
  }

  const withPhotos = item.children.some((c) => c.photo);

  return (
    <li className="static" onMouseEnter={onOpen}>
      <button
        type="button"
        className={cn(linkClass, open && "text-pacific")}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {item.label}
        <ChevronDown
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          id={id}
          className="absolute inset-x-0 top-full border-t border-t-pacific/30 bg-navy"
        >
          <div className="mx-auto max-w-site px-edge py-8">
            {withPhotos ? (
              <div className="grid grid-cols-12 gap-6">
                <ul className="col-span-8 grid grid-cols-3 gap-x-6 gap-y-1">
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <Link
                        href={child.href}
                        className="body-s block border-b border-b-pacific/20 py-3 text-fog transition-colors hover:text-amber"
                        onMouseEnter={() => setPreview(child.photo ?? null)}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* The nav previews the real work rather than listing words twice. */}
                <div className="col-span-4">
                  <Photo
                    name={preview ?? item.children[0].photo!}
                    ratio="16:10"
                    sizes="380px"
                  />
                  <p className="meta mt-3 text-muted">
                    {photos[preview ?? item.children[0].photo!].credit}
                  </p>
                </div>
              </div>
            ) : (
              <ul className="grid grid-cols-3 gap-x-6 gap-y-1">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      className="body-s block border-b border-b-pacific/20 py-3 text-fog transition-colors hover:text-amber"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

/* -------------------------------------------------------------------------- */

function MobileNav({ onClose }: { onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Move focus in, trap it, and hand it back on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel?.addEventListener("keydown", onKey);
    return () => {
      panel?.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, []);

  return (
    <div
      ref={panelRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="on-navy fixed inset-0 z-50 flex flex-col bg-navy lg:hidden"
    >
      <div className="flex items-center justify-between px-edge py-2.5">
        <Logo tone="light" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-mr-2 inline-flex size-11 items-center justify-center text-white"
        >
          <Close />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-edge pb-8">
        <ul>
          {nav.map((item) => {
            const open = expanded === item.label;
            return (
              <li key={item.label} className="border-b border-b-pacific/20">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-5 text-left"
                      aria-expanded={open}
                      onClick={() => setExpanded(open ? null : item.label)}
                    >
                      <span className="display-s text-white">{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "text-pacific transition-transform duration-200",
                          open && "rotate-180",
                        )}
                      />
                    </button>
                    {open && (
                      <ul className="pb-4">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="body-s block py-2 text-fog hover:text-amber"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="display-s block py-5 text-white hover:text-amber"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-4">
          <Button href="#quote">Get A Quote</Button>
          <Button href={business.phoneHref} variant="tertiary-invert">
            Call {business.phone}
          </Button>
        </div>
      </nav>
    </div>
  );
}
