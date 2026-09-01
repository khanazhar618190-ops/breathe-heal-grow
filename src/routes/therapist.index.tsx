import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarDays, Users, NotebookPen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/therapist/")({
  head: () => ({
    meta: [
      { title: "Therapist Overview — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "Today's sessions, risk flags and caseload summary for therapists at Breathe Heal Grow.",
      },
      { property: "og:title", content: "Therapist Overview — Breathe Heal Grow" },
      {
        property: "og:description",
        content: "Sessions, risk flags and caseload at a glance.",
      },
    ],
  }),
  component: TherapistOverview,
});

const today = [
  { time: "09:30", name: "Azhar K.", type: "Follow-up · Video", tone: "bg-mint/60" },
  { time: "11:00", name: "Priya S.", type: "First session · In person", tone: "bg-blush/60" },
  { time: "14:15", name: "Rahul V.", type: "Follow-up · Video", tone: "bg-sand/70" },
  { time: "16:00", name: "Neha D.", type: "Review · Phone", tone: "bg-secondary" },
];

const flags = [
  { name: "Rahul V.", note: "Mood scores dropped 3 days running", level: "High" },
  { name: "Neha D.", note: "Missed two check-ins this week", level: "Watch" },
];

function TherapistOverview() {
  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow text-teal">Tuesday, 4 sessions</p>
        <h1 className="mt-3 text-3xl font-bold text-teal sm:text-4xl">Good morning, Dr. Meera</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">
          Two people need a closer look today. Everything else is on track.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-4">
        {[
          { icon: Users, label: "Active patients", value: "38", accent: "text-teal" },
          { icon: CalendarDays, label: "Sessions today", value: "4", accent: "text-coral" },
          { icon: NotebookPen, label: "Notes pending", value: "3", accent: "text-gold" },
          { icon: AlertTriangle, label: "Risk flags", value: "2", accent: "text-coral" },
        ].map(({ icon: Icon, label, value, accent }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-6 shadow-soft">
            <Icon className={`h-5 w-5 ${accent}`} aria-hidden />
            <p className="eyebrow mt-3 text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-teal">{value}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-lg border border-border bg-card p-7 shadow-soft">
          <h2 className="text-xl font-bold text-teal">Today's schedule</h2>
          <ul className="mt-6 space-y-3">
            {today.map((s) => (
              <li key={s.time} className={`flex items-center gap-4 rounded-lg p-4 ${s.tone}`}>
                <span className="font-display text-sm font-bold text-teal">{s.time}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-teal">{s.name}</p>
                  <p className="text-xs text-foreground/70">{s.type}</p>
                </div>
                <button type="button" className="ml-auto text-xs font-semibold uppercase tracking-widest text-coral">
                  Open
                </button>
              </li>
            ))}
          </ul>
          <Link
            to="/therapist/schedule"
            className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal"
          >
            Full schedule <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>

        <section className="rounded-lg bg-blush/60 p-7">
          <h2 className="text-xl font-bold text-coral">Needs attention</h2>
          <ul className="mt-6 space-y-5">
            {flags.map((f) => (
              <li key={f.name} className="rounded-lg bg-card p-4 shadow-soft">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-teal">{f.name}</p>
                  <span className="rounded-full bg-coral px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-coral-foreground">
                    {f.level}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/75">{f.note}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/therapist/patients"
            className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-coral"
          >
            View caseload <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </section>
      </div>
    </div>
  );
}
