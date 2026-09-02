import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldAlert, Check, Trash2, PhoneCall } from "lucide-react";

export const Route = createFileRoute("/admin/moderation")({
  head: () => ({
    meta: [
      { title: "Moderation Queue — Breathe Heal Grow Admin" },
      {
        name: "description",
        content:
          "Review flagged community posts and crisis escalations with care and clear guidelines.",
      },
      { property: "og:title", content: "Moderation Queue — Breathe Heal Grow Admin" },
      { property: "og:description", content: "Flagged posts and crisis escalations." },
    ],
  }),
  component: AdminModeration,
});

const initialQueue = [
  {
    id: 1,
    author: "anon_4821",
    reason: "Possible self-harm mention",
    severity: "Crisis",
    excerpt: "I don't think I can keep doing this much longer, nothing helps anymore…",
  },
  {
    id: 2,
    author: "kavya_r",
    reason: "Unverified medical advice",
    severity: "Review",
    excerpt: "You should just stop taking your medication, honestly it made me worse…",
  },
  {
    id: 3,
    author: "wellness_ads",
    reason: "Spam / promotion",
    severity: "Low",
    excerpt: "Join my paid healing bootcamp, DM for the link and a discount code!",
  },
];

const severityTone: Record<string, string> = {
  Crisis: "bg-coral text-coral-foreground",
  Review: "bg-sand text-gold",
  Low: "bg-secondary text-teal",
};

function AdminModeration() {
  const [queue, setQueue] = useState(initialQueue);

  const resolve = (id: number) => setQueue((q) => q.filter((item) => item.id !== id));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="rule-coral text-3xl font-bold text-coral sm:text-4xl">Moderation queue</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75">
          Crisis flags go to the helpline team first, always within the hour. Everything else is
          reviewed against the community guidelines.
        </p>
      </header>

      {queue.length === 0 ? (
        <section className="rounded-lg bg-mint/60 p-10 text-center">
          <p className="font-display text-xl font-bold text-teal">Queue is clear</p>
          <p className="mt-2 text-sm text-foreground/75">Nothing waiting on review right now.</p>
        </section>
      ) : (
        <ul className="space-y-5">
          {queue.map((item) => (
            <li key={item.id} className="rounded-lg border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-center gap-3">
                <ShieldAlert className="h-4 w-4 text-coral" aria-hidden />
                <span className={`rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-widest ${severityTone[item.severity]}`}>
                  {item.severity}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.reason} · reported on {item.author}
                </span>
              </div>
              <p className="mt-4 rounded-md bg-muted p-4 text-sm leading-relaxed text-foreground/80">
                “{item.excerpt}”
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {item.severity === "Crisis" && (
                  <button type="button" className="btn-base btn-coral" onClick={() => resolve(item.id)}>
                    <PhoneCall className="h-3.5 w-3.5" aria-hidden />
                    Escalate to helpline
                  </button>
                )}
                <button type="button" className="btn-base btn-teal" onClick={() => resolve(item.id)}>
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  Keep post
                </button>
                <button type="button" className="btn-base btn-outline-coral" onClick={() => resolve(item.id)}>
                  <Trash2 className="h-3.5 w-3.5" aria-hidden />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <section className="rounded-lg bg-sand/70 p-7">
        <h2 className="text-lg font-bold text-gold">Reviewer reminder</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/80">
          Never reply publicly to a crisis post. Escalate, then let a trained counsellor reach out
          privately.
        </p>
      </section>
    </div>
  );
}
