import { redirect } from "next/navigation";

// This page has been removed. The permanent HTTP redirect in next.config.ts
// sends /refund-policy → /terms at the network level; this module prevents
// the TypeScript compiler from complaining about an unresolvable route.
export default function Page() {
  redirect("/terms");
}
