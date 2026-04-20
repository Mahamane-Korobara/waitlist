import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

import { renderWaitlistConfirmationEmail } from "@/emails/waitlist-confirmation-email";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";

type WaitlistInsert = {
  email: string;
  created_at?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value || value.includes("your-")) {
    throw new Error(`${name} doit etre defini correctement.`);
  }

  return value;
}

function getSupabaseUrl() {
  const value = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!value || value.includes("your-project")) {
    throw new Error("SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_URL doit etre defini correctement.");
  }

  return value;
}

function getSupabaseAdmin() {
  const url = getSupabaseUrl();
  const serviceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function getResendClient() {
  const apiKey = requireEnv("RESEND_API_KEY");
  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !emailRegex.test(email)) {
      return Response.json(
        { message: "Merci de fournir une adresse email valide." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const resend = getResendClient();

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }] satisfies WaitlistInsert[]);

    if (error) {
      if (error.code === "23505") {
        return Response.json(
          {
            message:
              "Tu etais deja sur la waitlist. Ce move-la, tu l'avais deja fait avant beaucoup de monde.",
          },
          { status: 200 }
        );
      }

      console.error("Supabase insert error", error);

      return Response.json(
        { message: "Impossible d'enregistrer l'email pour le moment." },
        { status: 500 }
      );
    }

    const from = requireEnv("RESEND_FROM_EMAIL");

    const appUrl = siteUrl;

    const { error: resendError } = await resend.emails.send({
      from,
      to: [email],
      subject: "Tu viens de prendre une vraie longueur d'avance",
      html: renderWaitlistConfirmationEmail({
        email,
        appUrl,
      }),
      text: `Ton adresse ${email} est bien sur la waitlist. Tu viens de prendre une longueur d'avance. Revoir la page: ${appUrl}`,
    });

    if (resendError) {
      console.error("Resend send error", resendError);

      return Response.json(
        {
          message:
            "Ton email est enregistre, mais l'email de confirmation n'a pas pu etre envoye.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      message:
        "C'est fait. Tu viens de prendre une longueur d'avance. Va voir ta boite mail, ton message de confirmation t'attend.",
    });
  } catch (error) {
    console.error("Waitlist route error", error);

    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Configuration incomplete. Verifie tes variables d'environnement.",
      },
      { status: 500 }
    );
  }
}
