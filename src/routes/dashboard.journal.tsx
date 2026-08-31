import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Feather, Search } from "lucide-react";

export const Route = createFileRoute("/dashboard/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "A private space to write how you feel, guided by gentle prompts and mood tags.",
      },
      { property: "og:title", content: "Journal — Breathe Heal Grow" },
      {
        property: "og:description",
        content: "Write freely, tag your mood, and revisit your reflections.",
      },
    ],
  }),
  component: JournalPage,
});

type Entry = { id: number; date: string; mood: string; title: string; body: string };

const seed: Entry[] = [
  {
    id: 1,
    date: "31 Aug 2026",
    mood: "Calm",
    title: "The walk helped",
    body: "Twenty minutes outside before work changed the shape of the whole morning. I noticed I was breathing lower in my chest by the end of it.",
  },
  {
    id: 2,
    date: "29 Aug 2026",
    mood: "Anxious",
    title: "Before the review",
    body: "My hands were cold all afternoon. I wrote down what I could actually control and the list was shorter than the worry.",
  },
  {
    id: 3,
    date: "26 Aug 2026",
    mood: "Low",
    title: "A quiet, flat day",
    body: "Nothing wrong, nothing bright. I made tea and let it be a small day instead of a failed one.",
  },
];

const prompts = [
  "What did today ask of you?",
  "Where did you feel tension in your body?",
  "Name one thing you'd like to carry into tomorrow.",
  "Who felt safe to be around this week?",
];

const moodTags = ["Calm", "Good", "Okay", "Low", "Anxious"];

function JournalPage() {
  const [entries, setEntries] = useState<Entry[]>(seed);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mood, setMood] = useState("Calm");
  const [query, setQuery] = useState("");

  const save = () => {
    if (!body.trim()) return;
    setEntries([
      {
        id: Date.now(),
        date: "Today",
        mood,
        title: title.trim() || "Untitled entry",
        body: body.trim(),
      },
      ...entries,
    ]);
    setTitle("");
    setBody("");
  };

  const visible = entries.filter((e) =>
    (e.title + e.body + e.mood).toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="rule-coral text-3xl font-bold text-coral sm:text-4xl">Journal</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">
          Private by default. Write a sentence or a page — both count.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-lg border border-border bg-card p-7 shadow-soft">
          <div className="flex items-center gap-2">
            <Feather className="h-4 w-4 text-coral" aria-hidden />
            <span className="eyebrow text-coral">New entry</span>
          </div>

          <label className="relative mt-5 block">
            <span className="field-label">Title</span>
            <input
              className="field-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give today a name"
            />
          </label>

          <textarea
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="How are you, honestly?"
            className="field-input mt-4 resize-none pt-4"
          />

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Mood:</span>
            {moodTags.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMood(m)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  mood === m
                    ? "border-teal bg-teal text-teal-foreground"
                    : "border-border text-foreground/70 hover:border-teal"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button type="button" onClick={save} className="btn-base btn-coral mt-6">
            Save entry
          </button>
        </section>

        <aside className="self-start rounded-lg bg-mint/60 p-7">
          <h2 className="eyebrow text-teal">Gentle prompts</h2>
          <ul className="mt-4 space-y-3">
            {prompts.map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => setBody(body ? `${body}\n\n${p} ` : `${p} `)}
                  className="text-left text-sm leading-relaxed text-foreground/80 underline decoration-teal/40 underline-offset-4 hover:text-teal"
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-teal">Past entries</h2>
          <label className="relative w-full sm:w-64">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search entries"
              className="w-full rounded-md border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none focus:border-coral"
            />
          </label>
        </div>

        <div className="mt-5 space-y-4">
          {visible.map((e) => (
            <article key={e.id} className="rounded-lg border border-border bg-card p-6 shadow-soft">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blush px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-coral">
                  {e.mood}
                </span>
                <span className="text-xs text-muted-foreground">{e.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-teal">{e.title}</h3>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/75">
                {e.body}
              </p>
            </article>
          ))}
          {visible.length === 0 && (
            <p className="rounded-lg bg-muted p-6 text-sm text-muted-foreground">
              No entries match that search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
