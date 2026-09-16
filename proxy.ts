import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16 renamed Middleware to Proxy — same mechanism, new file/export name.
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Only /account actually needs the session-refresh + gate check — running
// it on every marketing page too (the previous matcher) added a Supabase
// network round-trip to every single navigation on the site.
export const config = {
  matcher: ["/account/:path*"],
};
