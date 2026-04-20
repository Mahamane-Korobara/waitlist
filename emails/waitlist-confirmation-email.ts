type WaitlistConfirmationEmailProps = {
  email: string;
  appUrl: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderWaitlistConfirmationEmail({
  email,
  appUrl,
}: WaitlistConfirmationEmailProps) {
  const safeEmail = escapeHtml(email);
  const safeUrl = escapeHtml(appUrl);

  return `
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acces anticipe confirme</title>
  </head>
  <body style="margin:0;padding:32px 16px;background-color:#fff7ed;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#18181b;">
    <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:24px;padding:32px;border:1px solid #fed7aa;box-shadow:0 30px 80px -40px rgba(17,24,39,.35);">
      <p style="margin:0;font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#c2410c;font-weight:700;">
        Acces anticipe confirme
      </p>

      <h1 style="margin:20px 0 0;font-size:32px;line-height:1.15;font-weight:700;">
        Tu viens de faire un move que tres peu font assez tot.
      </h1>

      <p style="margin:16px 0 0;font-size:16px;line-height:1.8;color:#52525b;">
        Ton adresse <strong>${safeEmail}</strong> est bien sur la liste. Tu ne t'es pas juste inscrit:
        tu t'es place au bon moment, avant l'ouverture, avant le bruit, avant tout le monde.
      </p>

      <div style="margin-top:24px;border-radius:20px;padding:20px;background-color:#fff7ed;border:1px solid #fdba74;">
        <p style="margin:0;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#c2410c;font-weight:700;">
          Ce que ca veut dire
        </p>
        <ul style="margin:14px 0 0;padding-left:18px;color:#3f3f46;line-height:1.8;font-size:15px;">
          <li>Tu seras parmi les premiers prevenus.</li>
          <li>Ton badge fondateur est dans la ligne de mire.</li>
          <li>Tu fais deja partie du premier cercle a suivre.</li>
        </ul>
      </div>

      <a href="${safeUrl}" style="display:inline-block;margin-top:28px;padding:14px 20px;border-radius:999px;background-color:#f97316;color:#18181b;text-decoration:none;font-weight:700;">
        Revoir la page waitlist
      </a>

      <div style="margin-top:28px;padding-top:20px;border-top:1px solid #fed7aa;color:#71717a;font-size:14px;line-height:1.7;">
        <p style="margin:0;">
          Garde ce message. Le jour de l'ouverture, tu sauras que tu as eu le bon reflexe au bon moment.
        </p>
      </div>
    </div>
  </body>
</html>
`.trim();
}
