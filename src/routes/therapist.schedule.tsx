import { createFileRoute } from "@tanstack/react-router";
import { Video, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/therapist/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule — Breathe Heal Grow Therapist" },
      {
        name: "description",
        content: "Your week of sessions across video, phone and in-person appointments.",
      },
      { property: "og:title", content: "Schedule — Breathe Heal Grow Therapist" },
      { property: "og:description", content: "Your week of therapy sessions." },
    ],
  }),
  component: TherapistSchedule,
});

const days = [
  {
    day: "Tuesday",
    date: "1 Sep",
    slots: [
      { time: "09:30", name: "Azhar K.", mode: "video" },
      { time: "11:00", name: "Priya S.", mode: "person" },
      { time: "14:15", name: "Rahul V.", mode: "video" },
      { time: "16:00", name: "Neha D.", mode: "phone" },
    ],
  },
  {
    day: "Wednesday",
    date: "2 Sep",
    slots: [
      { time: "10:00", name: "Group session · Anxiety", mode: "person" },
      { time: "13:00", name: "Kavya R.", mode: "video" },
    ],
  },
  {
    day: "Thursday",
    date: "3 Sep",
    slots: [
      { time: "10:00", name: "Imran A.", mode: "video" },
      { time: "12:30", name: "Supervision", mode: "video" },
      { time: "15:00", name: "Azhar K.", mode: "phone" },
    ],
  },
];

const modeIcon = { video: Video, phone: Phone, person: MapPin } as const;

function TherapistSchedule() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="rule-coral text-3xl font-bold text-coral sm:text-4xl">Schedule</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">
          Nine sessions this week. Two slots are still open for urgent referrals.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {days.map((d) => (
          <section key={d.day} className="rounded-lg border border-border bg-card p-6 shadow-soft">
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-bold text-teal">{d.day}</h2>
              <span className="text-xs text-muted-foreground">{d.date}</span>
            </div>
            <ul className="mt-5 space-y-3">
              {d.slots.map((s) => {
                const Icon = modeIcon[s.mode as keyof typeof modeIcon];
                return (
                  <li key={s.time + s.name} className="flex items-start gap-3 rounded-md bg-mint/50 p-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
                    <div className="min-w-0">
                      <p className="font-display text-xs font-bold text-teal">{s.time}</p>
                      <p className="truncate text-sm text-foreground/80">{s.name}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <section className="rounded-lg bg-sand/70 p-7">
        <h2 className="text-lg font-bold text-gold">Open urgent slots</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/80">
          Wednesday 16:00 and Friday 09:00 are reserved for crisis referrals from the helpline team.
        </p>
      </section>
    </div>
  );
}
