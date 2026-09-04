import { business, nav, social } from "@/lib/content";
import { photoData } from "@/components/ui/Photo";
import {
  HeaderClient,
  type HeaderNavItem,
} from "@/components/home/HeaderClient";

/**
 * The site header — the server half.
 *
 * This file reads the data; `HeaderClient` renders it and owns the state.
 * The split is not cosmetic. `nav` is assembled from `services.map` and
 * `locations.map`, so a `"use client"` file importing it dragged the whole of
 * `content.ts` into the browser bundle — 260 KB of service, location and blog
 * copy that is already in the server-rendered HTML — and `Photo` did the same
 * for the photo registry. The header is on every route, so every route paid.
 *
 * What crosses the boundary is what the header actually draws: twenty labels
 * and hrefs, eleven resolved photo records for the Services preview, and four
 * contact strings. Resolve here, pass down, and keep `HeaderClient` free of
 * data-module imports.
 */
export function Header() {
  const menu: HeaderNavItem[] = nav.map((item) => ({
    label: item.label,
    href: item.href,
    children: item.children?.map((child) => ({
      label: child.label,
      href: child.href,
      // Only the Services children carry a photo; Locations children have
      // none, which is what `withPhotos` downstream keys off.
      photo: child.photo ? photoData(child.photo) : null,
    })),
  }));

  return (
    <HeaderClient
      nav={menu}
      contact={{
        phone: business.phone,
        phoneHref: business.phoneHref,
        email: business.email,
        emailHref: business.emailHref,
      }}
      social={social}
    />
  );
}
