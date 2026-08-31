import { createFileRoute } from "@tanstack/react-router";
import { Check, Flame, Wind, NotebookPen, HeartHandshake } from "lucide-react";

export const Route = createFileRoute("/dashboard/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "See your mood trend, practice streaks, habits and milestones over the last weeks.",
      },
      { property: "og:title", content: "Progress — Breathe Heal Grow" },
      {
        property: "og:description",
        content: "Mood trends, streaks and milestones on your healing journey.",
      },
    ],
  }),
  component: ProgressPage,
});

const week = [
  { day: "Mon", value: 3 },
  { day: "Tue", value: 2 },
  { day: "Wed", value: 4 },
  { day: "Thu", value: 3 },
  { day: "Fri", value: 5 },
  { day: "Sat", value: 4 },
  { day: "Sun", value: 5 },
];

const habits = [
  { icon: Wind, label: "Breathing practice", done: 6, goal: 7, accent: "text-teal", bar: "bg-teal" },
  { icon: NotebookPen, label: "Journal entry", done: 4, goal: 5, accent: "text-coral", bar: "bg-coral" },
  { icon: HeartHandshake, label: "Reached out to someone", done: 2, goal: 3, accent: "text-gold", bar: "bg-gold" },
];

const milestones = [
  { title: "First journal entry", when: "12 Jul", done: true },
  { title: "7-day check-in streak", when: "3 Aug", done: true },
  { title: "First therapy session booked", when: "21 Aug", done: true },
  { title: "30 days of breathing practice", when: "In 6 days", done: false },
];

function ProgressPage() {
  const max = 5;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="rule-teal text-3xl font-bold text-teal sm:text-4xl">Progress</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">
          Healing isn't linear. These are patterns, not scores.
        </p>
      </header>

      <section className="grid gap-5 sm:grid-cols-3">
        {[
          { icon: Flame, label: "Current streak", value: "12 days", tone: "bg-blush/60", accent: "text-coral" },
          { icon: Wind, label: "Calm minutes", value: "184", tone: "bg-mint/60", accent: "text-teal" },
          { icon: NotebookPen, label: "Entries written", value: "27", tone: "bg-sand/70", accent: "text-gold" },
        ].map(({ icon: Icon, label, value, tone, accent }) => (
          <div key={label} className={`rounded-lg p-6 ${tone}`}>
            <Icon className={`h-5 w-5 ${accent}`} aria-hidden />
            <p className="eyebrow mt-3 text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-teal">{value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-border bg-card p-7 shadow-soft">
        <h2 className="text-xl font-bold text-teal">Mood this week</h2>
        <p className="mt-1 text-xs text-muted-foreground">Higher bars are steadier days.</p>
        <div className="mt-7 flex items-end justify-between gap-3">
          {week.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-40 w-full items-end rounded-md bg-muted">
                <div
                  className="w-full rounded-md bg-teal transition-all"
                  style={{ height: `${(d.value / max) * 100}%` }}
                  aria-label={`${d.day}: ${d.value} of ${max}`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-card p-7 shadow-soft">
          <h2 className="text-xl font-bold text-teal">Weekly habits</h2>
          <div className="mt-6 space-y-6">
            {habits.map(({ icon: Icon, label, done, goal, accent, bar }) => (
              <div key={label}>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground/85">
                    <Icon className={`h-4 w-4 ${accent}`} aria-hidden />
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {done}/{goal}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${bar}`} style={{ width: `${(done / goal) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg bg-mint/60 p-7">
          <h2 className="text-xl font-bold text-teal">Milestones</h2>
          <ol className="mt-6 space-y-5">
            {milestones.map((m) => (
              <li key={m.title} className="flex items-start gap-4">
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    m.done ? "bg-teal text-teal-foreground" : "border border-teal/40 bg-card"
                  }`}
                >
                  {m.done ? <Check className="h-3.5 w-3.5" aria-hidden /> : null}
                </span>
                <div>
                  <p className={`text-sm font-semibold ${m.done ? "text-teal" : "text-foreground/70"}`}>
                    {m.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{m.when}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="rounded-lg bg-sand/70 p-7">
        <h2 className="text-lg font-bold text-coral">A note on numbers</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/80">
          A dip in a chart is not a setback. If a hard week is stretching into a hard month,
          consider speaking with a therapist — that is progress too.
        </p>
      </section>
    </div>
  );
}
