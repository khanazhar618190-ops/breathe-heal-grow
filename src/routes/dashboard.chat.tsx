import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Plus, Send, MessageCircle, Sprout, Phone } from "lucide-react";

export const Route = createFileRoute("/dashboard/chat")({
  head: () => ({
    meta: [
      { title: "Talk to Saathi — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "Chat privately with Saathi, your gentle companion for grounding, reflection and finding the right help.",
      },
      { property: "og:title", content: "Talk to Saathi — Breathe Heal Grow" },
      {
        property: "og:description",
        content: "A private, judgement-free chat companion for hard days.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { id: string; role: "user" | "assistant"; text: string };
type Thread = { id: string; title: string; updated: string; messages: Message[] };

const initialThreads: Thread[] = [
  {
    id: "t1",
    title: "Trouble sleeping",
    updated: "Today",
    messages: [
      { id: "m1", role: "user", text: "I keep waking up at 3am with my heart racing." },
      {
        id: "m2",
        role: "assistant",
        text: "That sounds exhausting — and frightening in the middle of the night. When you wake, does your mind land on something specific, or is it more a general sense of alarm?",
      },
      { id: "m3", role: "user", text: "Mostly work. I replay meetings." },
      {
        id: "m4",
        role: "assistant",
        text: "Replaying is your mind trying to solve something it can't at 3am. One thing that helps many people: keep a notebook by the bed and write the thought down as a note to your morning self. Would you like a short breathing sequence to try tonight as well?",
      },
    ],
  },
  {
    id: "t2",
    title: "Talking to my family",
    updated: "Yesterday",
    messages: [
      { id: "m1", role: "user", text: "I want to tell my parents I'm seeing a therapist." },
      {
        id: "m2",
        role: "assistant",
        text: "That takes real courage. You don't owe anyone the whole story — would it help to practise a short version you feel safe saying out loud?",
      },
    ],
  },
  {
    id: "t3",
    title: "A calmer morning routine",
    updated: "28 Aug",
    messages: [
      { id: "m1", role: "user", text: "Mornings feel rushed and awful." },
      {
        id: "m2",
        role: "assistant",
        text: "Let's make one small change rather than five. What is the first thing you reach for after waking?",
      },
    ],
  },
];

const suggestions = [
  "I'm feeling anxious right now",
  "Help me wind down for sleep",
  "I had a hard conversation today",
  "Suggest a 5-minute grounding exercise",
];

const replies = [
  "Thank you for telling me that. Let's slow it down a little — where do you notice that feeling in your body right now?",
  "That makes sense given everything you're carrying. What would a slightly kinder version of today look like?",
  "I'm here, and there's no rush. Would it help to breathe together for a minute before we keep going?",
  "That's worth writing down in your journal too. What part of it feels heaviest?",
];

function ChatPage() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [activeId, setActiveId] = useState<string>(initialThreads[0]!.id);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const active = threads.find((t) => t.id === activeId) ?? threads[0]!;

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [active.messages.length, typing]);

  const newThread = () => {
    const id = `t${Date.now()}`;
    setThreads((prev) => [{ id, title: "New conversation", updated: "Just now", messages: [] }, ...prev]);
    setActiveId(id);
    setDraft("");
  };

  const send = (text: string) => {
    const body = text.trim();
    if (!body) return;
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", text: body };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? {
              ...t,
              updated: "Just now",
              title: t.messages.length === 0 ? body.slice(0, 34) : t.title,
              messages: [...t.messages, userMsg],
            }
          : t,
      ),
    );
    setDraft("");
    setTyping(true);

    const threadId = active.id;
    window.setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)]!;
      setThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? { ...t, messages: [...t.messages, { id: `a${Date.now()}`, role: "assistant", text: reply }] }
            : t,
        ),
      );
      setTyping(false);
      inputRef.current?.focus();
    }, 1100);
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow text-teal">Private · nothing is shared without your consent</p>
        <h1 className="mt-3 text-3xl font-bold text-teal sm:text-4xl">Talk to Saathi</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75">
          A gentle companion for the in-between moments. Saathi is not a therapist — for urgent help,
          call a helpline.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        {/* Threads */}
        <aside className="rounded-lg border border-border bg-card p-4 shadow-soft">
          <button type="button" onClick={newThread} className="btn-base btn-coral w-full">
            <Plus className="h-3.5 w-3.5" aria-hidden />
            New chat
          </button>
          <ul className="mt-4 space-y-1">
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  className={`w-full rounded-md px-3 py-2 text-left transition-colors ${
                    t.id === active.id ? "bg-mint/70 text-teal" : "text-foreground/75 hover:bg-mint/40"
                  }`}
                >
                  <span className="flex items-center gap-2 text-[0.8rem] font-medium">
                    <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    <span className="truncate">{t.title}</span>
                  </span>
                  <span className="mt-0.5 block pl-5 text-[0.65rem] text-muted-foreground">{t.updated}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conversation */}
        <section className="flex min-h-[32rem] flex-col rounded-lg border border-border bg-card shadow-soft">
          <div className="flex items-center gap-3 border-b border-border/70 px-6 py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint">
              <Sprout className="h-4 w-4 text-teal" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-teal">Saathi</p>
              <p className="text-[0.68rem] text-muted-foreground">Companion · always here</p>
            </div>
            <button type="button" className="btn-base btn-outline-coral ml-auto">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              Helpline
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
            {active.messages.length === 0 && !typing && (
              <div className="rounded-lg bg-mint/50 p-6">
                <p className="font-display text-lg font-bold text-teal">What's on your mind today?</p>
                <p className="mt-2 text-sm text-foreground/75">
                  Start anywhere — a feeling, a sentence, or one of these:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-coral hover:text-coral"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {active.messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-teal px-4 py-3 text-sm leading-relaxed text-teal-foreground">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex gap-3">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint">
                    <Sprout className="h-3.5 w-3.5 text-teal" aria-hidden />
                  </span>
                  <p className="max-w-[85%] text-sm leading-relaxed text-foreground/85">{m.text}</p>
                </div>
              ),
            )}

            {typing && (
              <div className="flex gap-3">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint">
                  <Sprout className="h-3.5 w-3.5 text-teal" aria-hidden />
                </span>
                <p className="animate-pulse text-sm text-muted-foreground">Saathi is thinking…</p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            className="border-t border-border/70 px-6 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <div className="flex items-end gap-3">
              <textarea
                ref={inputRef}
                rows={2}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(draft);
                  }
                }}
                placeholder="Type how you're feeling…"
                aria-label="Message Saathi"
                className="field-input min-h-[3.25rem] flex-1 resize-none"
              />
              <button
                type="submit"
                disabled={!draft.trim() || typing}
                className="btn-base btn-teal shrink-0 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" aria-hidden />
                Send
              </button>
            </div>
            <p className="mt-2 text-[0.65rem] text-muted-foreground">
              This is a supportive companion, not a crisis service or medical advice.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
