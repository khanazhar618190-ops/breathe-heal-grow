import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Send,
  MessageCircle,
  Sprout,
  Phone,
  Moon,
  Sun,
  HeartHandshake,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/chat")({
  head: () => ({
    meta: [
      { title: "Companions — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "Choose a companion — Saathi, Meera, Aarav, Nani or Kabir — and chat privately for grounding, reflection and gentle guidance.",
      },
      { property: "og:title", content: "Chat with a companion — Breathe Heal Grow" },
      {
        property: "og:description",
        content: "Five distinct companions, one private and judgement-free space to talk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

type Message = { id: string; role: "user" | "assistant"; text: string };
type Thread = { id: string; characterId: string; title: string; updated: string; messages: Message[] };

type Character = {
  id: string;
  name: string;
  role: string;
  blurb: string;
  icon: LucideIcon;
  tint: string;
  ink: string;
  greeting: string;
  suggestions: readonly string[];
  replies: readonly string[];
};

const characters: readonly Character[] = [
  {
    id: "saathi",
    name: "Saathi",
    role: "Gentle companion",
    blurb: "Sits with you, no fixing, no rush.",
    icon: Sprout,
    tint: "bg-mint",
    ink: "text-teal",
    greeting: "What's on your mind today?",
    suggestions: [
      "I'm feeling anxious right now",
      "I just need to vent",
      "I had a hard conversation today",
      "Help me name what I'm feeling",
    ],
    replies: [
      "Thank you for telling me that. Let's slow it down a little — where do you notice that feeling in your body right now?",
      "That makes sense given everything you're carrying. What would a slightly kinder version of today look like?",
      "I'm here, and there's no rush. Would it help to breathe together for a minute before we keep going?",
      "That's worth writing down in your journal too. What part of it feels heaviest?",
    ],
  },
  {
    id: "meera",
    name: "Meera",
    role: "Mindfulness guide",
    blurb: "Breathwork, grounding and body scans.",
    icon: Moon,
    tint: "bg-sky/60",
    ink: "text-teal",
    greeting: "Shall we settle the body first?",
    suggestions: [
      "Guide me through a 5-minute grounding",
      "Help me wind down for sleep",
      "My chest feels tight",
      "Teach me box breathing",
    ],
    replies: [
      "Let's begin simply. Breathe in for four, hold for four, out for six. Tell me when you've done three rounds.",
      "Notice five things you can see, four you can touch, three you can hear. Take your time — I'll wait.",
      "Unclench your jaw and drop your shoulders half an inch. What shifts, even slightly?",
      "Place a hand where the feeling lives and breathe into that hand. What does the sensation want you to know?",
    ],
  },
  {
    id: "aarav",
    name: "Aarav",
    role: "Momentum coach",
    blurb: "Small, doable steps when you feel stuck.",
    icon: Sun,
    tint: "bg-sand",
    ink: "text-gold",
    greeting: "What's one thing we can make lighter today?",
    suggestions: [
      "I can't get started on anything",
      "Help me build a morning routine",
      "I keep procrastinating",
      "I want a plan for this week",
    ],
    replies: [
      "Let's shrink it. What is the two-minute version of the thing you're avoiding?",
      "Progress beats perfection here. Which single step would make tomorrow 10% easier?",
      "Motivation usually arrives after movement, not before. Can we pick a start time instead of a goal?",
      "Good. Let's protect that plan — what is most likely to get in the way, and what's our workaround?",
    ],
  },
  {
    id: "nani",
    name: "Nani",
    role: "Warm elder",
    blurb: "Comfort, perspective and old-fashioned care.",
    icon: HeartHandshake,
    tint: "bg-blush",
    ink: "text-coral",
    greeting: "Come, tell me everything, beta.",
    suggestions: [
      "I feel lonely",
      "My family doesn't understand me",
      "I'm being too hard on myself",
      "I just want some comfort",
    ],
    replies: [
      "Come here. You've been carrying this quietly for too long, haven't you?",
      "You are allowed to rest without earning it. When did you last eat something warm?",
      "People who love us sometimes love us clumsily. That doesn't mean you're unloved.",
      "I have seen many hard seasons pass. This one is heavy, but it is a season, not your whole life.",
    ],
  },
  {
    id: "kabir",
    name: "Kabir",
    role: "Reframe partner",
    blurb: "Untangles thought spirals, gently.",
    icon: Compass,
    tint: "bg-secondary",
    ink: "text-teal",
    greeting: "Which thought is looping today?",
    suggestions: [
      "I think everyone is judging me",
      "I always mess things up",
      "Help me question a thought",
      "I'm catastrophising about work",
    ],
    replies: [
      "Let's look at that thought as a claim rather than a fact. What evidence sits on each side?",
      "If a friend said this about themselves, what would you want them to hear?",
      "Notice the words 'always' and 'never' — they're usually a sign the mind is generalising. What's the more accurate sentence?",
      "So the worst case is possible but not likely. What's the most probable case, and could you cope with it?",
    ],
  },
];

const initialThreads: Thread[] = [
  {
    id: "t1",
    characterId: "saathi",
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
        text: "Replaying is your mind trying to solve something it can't at 3am. One thing that helps many people: keep a notebook by the bed and write the thought down as a note to your morning self.",
      },
    ],
  },
  {
    id: "t2",
    characterId: "saathi",
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
    characterId: "meera",
    title: "Evening body scan",
    updated: "Today",
    messages: [
      { id: "m1", role: "user", text: "My shoulders are up near my ears all day." },
      {
        id: "m2",
        role: "assistant",
        text: "Let's release them slowly. Breathe in and lift them higher on purpose, then exhale and let them fall. Three times.",
      },
    ],
  },
  {
    id: "t4",
    characterId: "aarav",
    title: "A calmer morning routine",
    updated: "28 Aug",
    messages: [
      { id: "m1", role: "user", text: "Mornings feel rushed and awful." },
      {
        id: "m2",
        role: "assistant",
        text: "Let's change one thing, not five. What is the first thing you reach for after waking?",
      },
    ],
  },
];

function ChatPage() {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [characterId, setCharacterId] = useState<string>("saathi");
  const [activeId, setActiveId] = useState<string | null>("t1");
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const character = characters.find((c) => c.id === characterId)!;
  const CharacterIcon = character.icon;

  const visibleThreads = useMemo(
    () => threads.filter((t) => t.characterId === characterId),
    [threads, characterId],
  );
  const active = visibleThreads.find((t) => t.id === activeId) ?? null;
  const messages = active?.messages ?? [];

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeId, characterId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages.length, typing]);

  const selectCharacter = (id: string) => {
    setCharacterId(id);
    const first = threads.find((t) => t.characterId === id);
    setActiveId(first ? first.id : null);
    setDraft("");
    setTyping(false);
  };

  const newThread = (forCharacter = characterId) => {
    const id = `t${Date.now()}`;
    setThreads((prev) => [
      { id, characterId: forCharacter, title: "New conversation", updated: "Just now", messages: [] },
      ...prev,
    ]);
    setCharacterId(forCharacter);
    setActiveId(id);
    setDraft("");
    return id;
  };

  const send = (text: string) => {
    const body = text.trim();
    if (!body) return;
    const threadId = active ? active.id : newThread();
    const userMsg: Message = { id: `u${Date.now()}`, role: "user", text: body };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
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

    const pool = character.replies;
    window.setTimeout(() => {
      const reply = pool[Math.floor(Math.random() * pool.length)]!;
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
    <div className="flex h-full min-h-0 lg:grid lg:grid-cols-[288px_1fr]">
      {/* Companions + threads */}
      <aside className="hidden min-h-0 flex-col border-r border-border/70 bg-mint/25 p-4 lg:flex">
        <Link to="/dashboard" className="mb-4 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-teal">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Dashboard
        </Link>

        <p className="eyebrow text-teal">Companions</p>
        <ul className="mt-3 space-y-1">
          {characters.map((c) => {
            const Icon = c.icon;
            const selected = c.id === characterId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => selectCharacter(c.id)}
                  className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors ${
                    selected ? "bg-card shadow-soft" : "hover:bg-card/70"
                  }`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${c.tint}`}>
                    <Icon className={`h-4 w-4 ${c.ink}`} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate text-[0.82rem] font-bold ${selected ? "text-teal" : "text-foreground/85"}`}>
                      {c.name}
                    </span>
                    <span className="block truncate text-[0.65rem] text-muted-foreground">{c.role}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex items-center justify-between">
          <p className="eyebrow text-teal">Chats</p>
          <button
            type="button"
            onClick={() => newThread()}
            className="flex items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-coral"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            New
          </button>
        </div>
        <ul className="mt-2 min-h-0 flex-1 space-y-1 overflow-y-auto">
          {visibleThreads.length === 0 && (
            <li className="px-3 py-2 text-[0.7rem] text-muted-foreground">
              No chats with {character.name} yet.
            </li>
          )}
          {visibleThreads.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setActiveId(t.id)}
                className={`w-full rounded-md px-3 py-2 text-left transition-colors ${
                  t.id === activeId ? "bg-card text-teal shadow-soft" : "text-foreground/75 hover:bg-card/70"
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
        <p className="mt-3 border-t border-border/60 pt-3 text-[0.65rem] leading-relaxed text-muted-foreground">
          Private · nothing is shared without your consent.
        </p>
      </aside>

      {/* Conversation */}
      <section className="flex min-h-0 flex-1 flex-col bg-background">
        <div className="flex items-center gap-3 border-b border-border/70 bg-card/60 px-5 py-3 backdrop-blur sm:px-8">
          <Link to="/dashboard" className="text-teal lg:hidden" aria-label="Back to dashboard">
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </Link>
          <span className={`flex h-10 w-10 items-center justify-center rounded-full ${character.tint}`}>
            <CharacterIcon className={`h-5 w-5 ${character.ink}`} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-teal">{character.name}</p>
            <p className="truncate text-[0.68rem] text-muted-foreground">{character.role} · always here</p>
          </div>
          <button type="button" onClick={() => newThread()} className="btn-base btn-outline-coral ml-auto lg:hidden">
            <Plus className="h-3.5 w-3.5" aria-hidden />
            New
          </button>
          <button type="button" className="btn-base btn-outline-coral ml-2 lg:ml-auto">
            <Phone className="h-3.5 w-3.5" aria-hidden />
            Helpline
          </button>
        </div>

        {/* Mobile companion strip */}
        <div className="flex gap-2 overflow-x-auto border-b border-border/60 bg-mint/20 px-5 py-3 lg:hidden">
          {characters.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => selectCharacter(c.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  c.id === characterId ? "border-coral bg-card text-teal" : "border-border/70 text-foreground/70"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${c.ink}`} aria-hidden />
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-8 sm:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            {messages.length === 0 && !typing && (
              <div className="py-10 text-center">
                <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${character.tint}`}>
                  <CharacterIcon className={`h-6 w-6 ${character.ink}`} aria-hidden />
                </span>
                <h1 className="mt-5 font-display text-2xl font-bold text-teal sm:text-3xl">
                  {character.greeting}
                </h1>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/75">
                  {character.blurb} {character.name} is not a therapist — for urgent help, call a helpline.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {character.suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card px-3.5 py-2 text-xs text-foreground/80 transition-colors hover:border-coral hover:text-coral"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-teal px-4 py-3 text-sm leading-relaxed text-teal-foreground">
                    {m.text}
                  </p>
                </div>
              ) : (
                <div key={m.id} className="flex gap-3">
                  <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${character.tint}`}>
                    <CharacterIcon className={`h-3.5 w-3.5 ${character.ink}`} aria-hidden />
                  </span>
                  <p className="max-w-[85%] text-[0.95rem] leading-relaxed text-foreground/85">{m.text}</p>
                </div>
              ),
            )}

            {typing && (
              <div className="flex gap-3">
                <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${character.tint}`}>
                  <CharacterIcon className={`h-3.5 w-3.5 ${character.ink}`} aria-hidden />
                </span>
                <p className="animate-pulse text-sm text-muted-foreground">{character.name} is thinking…</p>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        <form
          className="border-t border-border/70 bg-card/60 px-5 py-4 sm:px-8"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <div className="mx-auto max-w-2xl">
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
                placeholder={`Message ${character.name}…`}
                aria-label={`Message ${character.name}`}
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
              These are supportive companions, not a crisis service or medical advice.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}
