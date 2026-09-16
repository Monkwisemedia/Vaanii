import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { CHANNELS } from "@/lib/site";

/**
 * Public lead-capture form on the homepage ("See Vaanii on your own
 * WhatsApp or Instagram"). No login required, so this writes with the
 * service-role client — there's no per-user RLS policy for this table
 * on purpose (see supabase/migrations/0003_demo_requests.sql).
 */
export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Demo requests aren't switched on yet — check back shortly." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const businessName = String(body.businessName || "").trim();
  const businessType = String(body.businessType || "").trim();
  const phone = String(body.phone || "").trim();
  const channelId = String(body.channel || "whatsapp");
  const channel = CHANNELS.some((c) => c.id === channelId) ? channelId : "whatsapp";

  if (businessName.length < 2) {
    return NextResponse.json({ error: "Enter your business name." }, { status: 400 });
  }
  if (!/^[\d\s+()-]{7,20}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.from("demo_requests").insert({
      business_name: businessName,
      business_type: businessType || null,
      channel,
      phone,
    });

    if (error) {
      // Most likely the table doesn't exist yet — migration not run.
      console.error("demo_requests insert failed", error);
      return NextResponse.json(
        { error: "Couldn't save your request. Please try again shortly." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("demo-request route failed", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
