"use client";

import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export function WaitlistForm({
  variant = "light",
  buttonLabel = "Rejoindre la waitlist",
}: {
  variant?: "light" | "dark";
  buttonLabel?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState(
    "Pas de spam. Juste un message propre pour te confirmer que tu fais partie des premiers."
  );
  const isDark = variant === "dark";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setMessage("On verrouille ta place...");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Impossible de rejoindre la waitlist.");
      }

      setStatus("success");
      setEmail("");
      setMessage(
        payload.message ||
          "Tu es dedans. Franchement, c'etait un excellent move."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Reessaie dans un instant."
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full min-w-0">
      <div
        className={`relative flex min-w-0 flex-col gap-2 rounded-[1.75rem] p-2 sm:flex-row sm:items-center sm:rounded-full sm:p-1.5 ${
          isDark
            ? "border border-paper/15 bg-paper/10 backdrop-blur"
            : "border border-ink/10 bg-paper shadow-[0_10px_40px_-20px_hsl(var(--ink)/0.35)]"
        }`}
      >
        <span
          aria-hidden
          className={`absolute left-5 top-[1.1rem] text-sm sm:top-1/2 sm:-translate-y-1/2 ${
            isDark ? "text-paper/50" : "text-ink/40"
          }`}
        >
          @
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ton@email.com"
          className={`min-w-0 flex-1 bg-transparent px-4 py-3 pl-11 text-base outline-none sm:pr-3 ${
            isDark ? "text-paper placeholder:text-paper/40" : "text-ink placeholder:text-ink/35"
          }`}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-coral w-full shrink-0 !px-5 !py-3 sm:w-auto"
        >
          {status === "loading" ? "Envoi..." : buttonLabel}
          {status !== "loading" ? <span aria-hidden>→</span> : null}
        </button>
      </div>

      <p
        className={`mt-3 flex flex-wrap items-start gap-1.5 text-xs ${
          status === "error"
            ? "text-red-600"
            : status === "success"
              ? "text-emerald-700"
              : isDark
                ? "text-paper/55"
                : "text-ink-soft"
        }`}
      >
        <span className="shrink-0">✦</span>
        <span className="min-w-0 break-words leading-relaxed">{message}</span>
      </p>
    </form>
  );
}
