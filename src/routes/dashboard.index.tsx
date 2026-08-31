import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Wind, Sparkles, Users, Phone, PlayCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Your Space — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "Your daily check-in, breathing practice, guided sessions and community stories in one calm space.",
      },
      { property: "og:title", content: "Your Space — Breathe Heal Grow" },
      {
        property: "og:description",
        content: "Check in with your mood, breathe, and follow guided sessions.",
      },
    ],
  }),
  component: DashboardHome,
});

const moods = [
  { emoji: "🙂", label: "Good" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😣", label: "Anxious" },
];

const feed = [
  {
    tag: "Practice",
    icon: Wind,
    title: "4-7-8 breathing, 5 minutes",
    body: "A short reset for a racing mind. Inhale four, hold seven, exhale eight.",
    tone: "bg-mint/60",
    accent: "text-teal",
  },
  {
    tag: "Session",
    icon: PlayCircle,
    title: "Guided body scan with Dr. Meera",
    body: "Release tension one area at a time. Best listened to with headphones.",
    tone: "bg-blush/60",
    accent: "text-coral",
  },
  {
    tag: "Story",
    icon: Users,
    title: "“Talking about it was the hardest first step”",
    body: "A community member on reaching out for help after two silent years.",
    tone: "bg-sand/70",
    accent: "text-gold",
  },
  {
    tag: "Reflection",
    icon: Sparkles,
    title: "Name three things that felt kind today",
    body: "Small noticing builds a steadier baseline over weeks, not days.",
    tone: "bg-secondary",
    accent: "text-teal",
  },
];

function DashboardHome() {
  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <section className="rounded-lg bg-mint/60 p-8">
        <p className="eyebrow text-teal">Monday, gentle start</p>
        <h1 className="mt-3 text-3xl font-bold text-teal sm:text-4xl">Welcome back, Azhar</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-foreground/75">
          How are you arriving today? One honest tap is enough — nothing here is graded.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {moods.map((m) => (
            <button
              key={m.label}
              type="button"
              onClick={() => setMood(m.label)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                mood === m.label
                  ? "border-coral bg-coral text-coral-foreground"
                  : "border-border bg-card text-foreground/80 hover:border-coral"
              }`}
            >
              <span aria-hidden>{m.emoji}</span>
              {m.label}
            </button>
          ))}
        </div>
        {mood && (
          <p className="mt-4 text-xs text-teal">
            Logged “{mood}”. Want to write about it?{" "}
            <Link to="/dashboard/journal" className="font-semibold underline underline-offset-4">
              Open your journal
            </Link>
          </p>
        )}
      </section>

      <section className="grid gap-5 sm:grid-cols-3">
        {[
          { label: "Check-in streak", value: "12 days", tone: "bg-card" },
          { label: "Minutes breathed", value: "184", tone: "bg-card" },
          { label: "Journal entries", value: "27", tone: "bg-card" },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg border border-border p-6 ${s.tone} shadow-soft`}>
            <p className="eyebrow text-muted-foreground">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-teal">{s.value}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="rule-coral text-2xl font-bold text-coral">For you today</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {feed.map(({ tag, icon: Icon, title, body, tone, accent }) => (
            <article key={title} className={`rounded-lg p-6 ${tone} shadow-soft`}>
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${accent}`} aria-hidden />
                <span className={`eyebrow ${accent}`}>{tag}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug text-teal">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{body}</p>
              <button type="button" className={`mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${accent}`}>
                Begin <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-coral p-7 text-coral-foreground">
        <div>
          <h2 className="text-xl font-bold">Need to talk right now?</h2>
          <p className="mt-1 text-sm opacity-90">Trained listeners are available 24/7.</p>
        </div>
        <button type="button" className="btn-base border border-current bg-transparent text-coral-foreground">
          <Phone className="h-3.5 w-3.5" aria-hidden />
          Call a helpline
        </button>
      </section>
    </div>
  );
}
