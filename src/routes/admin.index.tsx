import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Stethoscope, HeartHandshake, PhoneCall, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Overview — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "Platform health for Breathe Heal Grow: members, therapists, helpline load and donations.",
      },
      { property: "og:title", content: "Admin Overview — Breathe Heal Grow" },
      { property: "og:description", content: "Members, therapists, helpline load and donations." },
    ],
  }),
  component: AdminOverview,
});

const signups = [
  { month: "Apr", value: 42 },
  { month: "May", value: 58 },
  { month: "Jun", value: 71 },
  { month: "Jul", value: 66 },
  { month: "Aug", value: 88 },
  { month: "Sep", value: 96 },
];

const activity = [
  { text: "Dr. Meera Iyer verified as therapist", when: "12 min ago", tone: "text-teal" },
  { text: "Helpline call volume spiked 18% in Pune", when: "1 hr ago", tone: "text-coral" },
  { text: "3 community posts flagged for review", when: "3 hrs ago", tone: "text-gold" },
  { text: "Corporate program onboarded: Lumen Tech", when: "Yesterday", tone: "text-teal" },
];

function AdminOverview() {
  const max = Math.max(...signups.map((s) => s.value));

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow text-gold">Platform health</p>
        <h1 className="mt-3 text-3xl font-bold text-teal sm:text-4xl">Admin overview</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">
          Growth is steady and helpline coverage is holding. Three items need moderation.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Users, label: "Members", value: "12,480", tone: "bg-mint/60", accent: "text-teal" },
          { icon: Stethoscope, label: "Therapists", value: "64", tone: "bg-blush/60", accent: "text-coral" },
          { icon: PhoneCall, label: "Helpline calls / wk", value: "1,205", tone: "bg-sand/70", accent: "text-gold" },
          { icon: HeartHandshake, label: "Donations (MTD)", value: "₹8.4L", tone: "bg-secondary", accent: "text-teal" },
        ].map(({ icon: Icon, label, value, tone, accent }) => (
          <div key={label} className={`rounded-lg p-6 ${tone}`}>
            <Icon className={`h-5 w-5 ${accent}`} aria-hidden />
            <p className="eyebrow mt-3 text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-teal">{value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-lg border border-border bg-card p-7 shadow-soft">
          <h2 className="text-xl font-bold text-teal">New members per month</h2>
          <p className="mt-1 text-xs text-muted-foreground">Hundreds of people reaching out, month on month.</p>
          <div className="mt-7 flex items-end justify-between gap-3">
            {signups.map((s) => (
              <div key={s.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-40 w-full items-end rounded-md bg-muted">
                  <div
                    className="w-full rounded-md bg-coral"
                    style={{ height: `${(s.value / max) * 100}%` }}
                    aria-label={`${s.month}: ${s.value} new members`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{s.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-mint/60 p-7">
          <h2 className="text-xl font-bold text-teal">Recent activity</h2>
          <ul className="mt-6 space-y-4">
            {activity.map((a) => (
              <li key={a.text} className="rounded-lg bg-card p-4 shadow-soft">
                <p className={`text-sm font-medium ${a.tone}`}>{a.text}</p>
                <p className="mt-1 text-xs text-muted-foreground">{a.when}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/admin/moderation"
            className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-coral"
          >
            Open moderation queue <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}
