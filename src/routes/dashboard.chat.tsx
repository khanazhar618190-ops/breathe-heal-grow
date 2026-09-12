import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Search,
  Send,
  Smile,
  User,
  Mic,
  CheckCheck,
} from "lucide-react";

import sage from "@/assets/guide-sage.jpg";
import mira from "@/assets/guide-mira.jpg";
import arjun from "@/assets/guide-arjun.jpg";
import kai from "@/assets/guide-kai.jpg";
import luna from "@/assets/guide-luna.jpg";
import aroha from "@/assets/guide-aroha.jpg";

export const Route = createFileRoute("/dashboard/chat")({
  component: ChatPage,
  head: () => ({
    meta: [
      { title: "Your Conversations Matter | Breathe Heal Grow" },
      {
        name: "description",
        content:
          "Chat with a caring guide any time. A safe space to talk, reflect and grow with Breathe Heal Grow.",
      },
      { property: "og:title", content: "Your Conversations Matter | Breathe Heal Grow" },
      {
        property: "og:description",
        content: "Choose a guide and talk it through — support, guidance and wellness in one calm space.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Category = "Support" | "Guidance" | "Wellness";

type Guide = {
  id: string;
  name: string;
  title: string;
  blurb: string;
  avatar: string;
  category: Category;
  greeting: string[];
  suggestions: string[];
  replies: string[][];
};

const guides: Guide[] = [
  {
    id: "sage",
    name: "Sage",
    title: "Your Calm Companion",
    blurb: "A supportive friend to help you navigate life's ups and downs.",
    avatar: sage,
    category: "Support",
    greeting: ["Hi there", "How are you feeling today? 🌿"],
    suggestions: ["I feel anxious", "I need motivation", "Help me relax"],
    replies: [
      [
        "It's completely okay to feel this way.",
        "You're not alone in this. Would you like to talk more about what's been on your mind?",
      ],
      ["Thank you for sharing that with me.", "It takes courage to be open about how you feel. Let's take this one step at a time. 🌿"],
      ["I'm here, and I'm listening.", "What feels heaviest right now?"],
    ],
  },
  {
    id: "mira",
    name: "Mira",
    title: "Self-Love & Confidence",
    blurb: "Helps you build self-acceptance, confidence and a kinder inner voice.",
    avatar: mira,
    category: "Guidance",
    greeting: ["Hello, I'm glad you're here.", "What would a kinder voice tell you today? 💛"],
    suggestions: ["I doubt myself", "Say something kind", "Help me set a boundary"],
    replies: [
      ["That's a beautiful step 💛", "Notice how you spoke about yourself just now — could we soften that a little?"],
      ["You are allowed to take up space.", "Let's name one thing you handled well this week."],
    ],
  },
  {
    id: "arjun",
    name: "Dr. Arjun",
    title: "Professional Guidance",
    blurb: "Evidence-based insights and practical advice.",
    avatar: arjun,
    category: "Guidance",
    greeting: ["Good to see you.", "Tell me what's been happening, and we'll look at it together."],
    suggestions: ["I can't sleep", "Explain anxiety", "Coping strategies"],
    replies: [
      ["Take a deep breath. You've got more control here than it feels like.", "Let's break this into what's in your hands and what isn't."],
      ["That pattern is very common, and it responds well to small changes.", "Would you like a simple practice to try tonight?"],
    ],
  },
  {
    id: "kai",
    name: "Kai",
    title: "Mindfulness & Balance",
    blurb: "Simple practices for a calmer, more present you.",
    avatar: kai,
    category: "Wellness",
    greeting: ["Hey. Let's slow this moment down.", "Feet on the floor, shoulders soft. Ready?"],
    suggestions: ["Guide my breathing", "I feel restless", "A short body scan"],
    replies: [
      ["Here's a short exercise for you:", "Breathe in for 4, hold for 4, out for 6. Three rounds — I'll wait. 🌊"],
      ["Beautifully done.", "Notice one thing you can hear right now. Just one."],
    ],
  },
  {
    id: "luna",
    name: "Luna",
    title: "Sleep & Relaxation",
    blurb: "Guidance for better sleep and deeper rest.",
    avatar: luna,
    category: "Wellness",
    greeting: ["Sweet dreams start with a calm mind.", "How has your rest been lately? 🌙"],
    suggestions: ["I can't switch off", "A bedtime routine", "Read me something calm"],
    replies: [
      ["Let's dim everything down together.", "Put your phone face down after this message and let your breath get slower."],
      ["Rest isn't something you earn.", "You're allowed to stop for today."],
    ],
  },
  {
    id: "aroha",
    name: "Aroha",
    title: "Life Transitions",
    blurb: "Support through change, uncertainty and new beginnings.",
    avatar: aroha,
    category: "Support",
    greeting: ["Change can be hard, but you're not doing it wrong.", "What's shifting for you right now?"],
    suggestions: ["Everything is changing", "I feel lost", "Starting over"],
    replies: [
      ["Change can be hard, but you're already carrying it well.", "What's one part of this you'd like to feel steadier about?"],
      ["Uncertainty is uncomfortable, not dangerous.", "Let's find one small anchor for this week."],
    ],
  },
];

type Msg = { id: string; from: "me" | "them"; text: string; time: string };

const now = () =>
  new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const seedPreview: Record<string, { preview: string; time: string; unread: number }> = {
  sage: { preview: "You: I've been feeling a bit ove…", time: "10:24 AM", unread: 2 },
  mira: { preview: "That's a beautiful step 💛", time: "9:15 AM", unread: 1 },
  arjun: { preview: "Take a deep breath. You've go…", time: "Yesterday", unread: 0 },
  kai: { preview: "Here's a short exercise for you…", time: "Yesterday", unread: 0 },
  luna: { preview: "Sweet dreams start with a cal…", time: "Mon", unread: 0 },
  aroha: { preview: "Change can be hard, but you'…", time: "Mon", unread: 0 },
};

const filters = ["All", "Support", "Guidance", "Wellness"] as const;

function ChatPage() {
  const [view, setView] = useState<"list" | "chat" | "guides">("list");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(guides[0]!.id);
  const [threads, setThreads] = useState<Record<string, Msg[]>>(() =>
    Object.fromEntries(
      guides.map((g) => [
        g.id,
        g.greeting.map((text, i) => ({
          id: `${g.id}-seed-${i}`,
          from: "them" as const,
          text,
          time: "10:20 AM",
        })),
      ]),
    ),
  );
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const turn = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const active = guides.find((g) => g.id === activeId)!;
  const messages = threads[activeId] ?? [];

  const list = useMemo(
    () =>
      guides.filter(
        (g) =>
          (filter === "All" || g.category === filter) &&
          (g.name + g.title).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [filter, query],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, typing, view]);

  useEffect(() => {
    if (view === "chat") inputRef.current?.focus();
  }, [view, activeId]);

  function openChat(id: string) {
    setActiveId(id);
    setView("chat");
  }

  function send(text: string) {
    const body = text.trim();
    if (!body) return;
    setDraft("");
    setThreads((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), { id: crypto.randomUUID(), from: "me", text: body, time: now() }],
    }));
    setTyping(true);
    const pool = active.replies[turn.current % active.replies.length]!;
    turn.current += 1;
    pool.forEach((line, i) => {
      window.setTimeout(
        () => {
          setThreads((prev) => ({
            ...prev,
            [activeId]: [...(prev[activeId] ?? []), { id: crypto.randomUUID(), from: "them", text: line, time: now() }],
          }));
          if (i === pool.length - 1) setTyping(false);
        },
        900 + i * 1200,
      );
    });
  }

  return (
    <div className="flex h-full min-h-0 bg-background">
      {/* Conversation list */}
      <aside
        className={`min-h-0 w-full flex-col border-r border-border/60 bg-muted/40 md:flex md:w-[22rem] lg:w-[24rem] ${
          view === "list" ? "flex" : "hidden"
        }`}
      >
        <div className="px-5 pb-4 pt-6">
          <div className="flex items-start justify-between">
            <Link to="/dashboard" className="font-display text-[0.78rem] font-bold uppercase leading-[1.15] tracking-[0.14em] text-coral">
              Breathe
              <br />
              Heal
              <br />
              Grow
            </Link>
            <div className="flex items-center gap-3 text-teal">
              <Search className="h-5 w-5" aria-hidden />
              <User className="h-5 w-5" aria-hidden />
            </div>
          </div>

          <h1 className="mt-5 font-display text-[2rem] font-bold leading-[1.08] text-teal">
            Your
            <br />
            Conversations
            <br />
            Matter
          </h1>
          <p className="mt-2 text-[0.9rem] text-teal/75">A safe space to talk, reflect and grow.</p>

          <label className="sr-only" htmlFor="chat-search">
            Search guides
          </label>
          <input
            id="chat-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="mt-4 w-full rounded-full border border-border/70 bg-background px-4 py-2 text-[0.85rem] text-foreground outline-none placeholder:text-muted-foreground focus:border-teal/50"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors ${
                  filter === f ? "bg-teal text-teal-foreground" : "bg-background text-teal/80 hover:bg-mint/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
          {list.map((g) => {
            const meta = seedPreview[g.id]!;
            const isActive = g.id === activeId;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => openChat(g.id)}
                className={`mb-1 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors ${
                  isActive ? "bg-blush/70" : "hover:bg-background"
                }`}
              >
                <img
                  src={g.avatar}
                  alt=""
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-display text-[1rem] font-bold text-teal">{g.name}</span>
                    <span className="ml-auto shrink-0 text-[0.7rem] text-muted-foreground">{meta.time}</span>
                  </span>
                  <span className="block truncate text-[0.82rem] text-teal/70">{g.title}</span>
                  <span className="mt-0.5 flex items-center gap-2">
                    <span className="block min-w-0 flex-1 truncate text-[0.82rem] text-muted-foreground">
                      {meta.preview}
                    </span>
                    {meta.unread > 0 && (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-[0.65rem] font-bold text-coral-foreground">
                        {meta.unread}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setView("guides")}
            className="mt-2 flex w-full items-center justify-between rounded-2xl border border-dashed border-teal/30 px-4 py-3 text-left text-[0.85rem] font-medium text-teal hover:bg-mint/40"
          >
            Choose a different guide
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </aside>

      {/* Chat thread */}
      <section
        className={`min-h-0 w-full flex-col ${view === "chat" ? "flex" : "hidden"} ${
          view === "guides" ? "md:hidden" : "md:flex"
        }`}
      >
        <header className="flex items-center gap-3 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur">
          <button
            type="button"
            onClick={() => setView("list")}
            className="rounded-full p-1.5 text-teal hover:bg-mint/50 md:hidden"
            aria-label="Back to conversations"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <img
            src={active.avatar}
            alt=""
            loading="lazy"
            width={512}
            height={512}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="font-display text-[1.05rem] font-bold leading-tight text-teal">{active.name}</p>
            <p className="truncate text-[0.8rem] text-teal/70">{active.title}</p>
            <p className="flex items-center gap-1.5 text-[0.72rem] text-teal/70">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              {typing ? "Typing…" : "Online"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setView("guides")}
            className="ml-auto rounded-full p-1.5 text-teal hover:bg-mint/50"
            aria-label="Choose a guide"
          >
            <MoreVertical className="h-5 w-5" aria-hidden />
          </button>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <div className="mx-auto flex max-w-2xl flex-col gap-3">
            <div className="rounded-2xl bg-sky-100/80 px-5 py-4 text-[0.95rem] leading-relaxed text-teal">
              Take a deep breath.
              <br />
              You're doing better than you think.
            </div>

            <div className="my-1 self-center rounded-full bg-muted px-3 py-1 text-[0.72rem] text-muted-foreground">
              Today
            </div>

            {messages.map((m) =>
              m.from === "them" ? (
                <div key={m.id} className="flex items-end gap-2">
                  <img
                    src={active.avatar}
                    alt=""
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                  <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-background px-4 py-3 text-[0.95rem] leading-relaxed text-foreground shadow-sm ring-1 ring-border/60">
                    {m.text}
                  </div>
                  <span className="shrink-0 pb-1 text-[0.68rem] text-muted-foreground">{m.time}</span>
                </div>
              ) : (
                <div key={m.id} className="flex items-end justify-end gap-2">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-blush px-4 py-3 text-[0.95rem] leading-relaxed text-teal">
                    {m.text}
                    <span className="mt-1 flex items-center justify-end gap-1 text-[0.68rem] text-teal/60">
                      {m.time}
                      <CheckCheck className="h-3.5 w-3.5 text-sky-500" aria-hidden />
                    </span>
                  </div>
                </div>
              ),
            )}

            {typing && (
              <div className="flex items-end gap-2">
                <img
                  src={active.avatar}
                  alt=""
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-background px-4 py-3 ring-1 ring-border/60">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-teal/40"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border/60 bg-background px-4 pb-4 pt-3">
          <div className="mx-auto max-w-2xl">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {active.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="shrink-0 rounded-full bg-muted px-4 py-2 text-[0.82rem] text-teal hover:bg-mint/60"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-coral"
                aria-label="Add attachment"
              >
                <Plus className="h-5 w-5" aria-hidden />
              </button>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-muted px-4 py-2">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type a message…"
                  aria-label="Type a message"
                  className="min-w-0 flex-1 bg-transparent py-1 text-[0.95rem] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <Smile className="h-5 w-5 shrink-0 text-teal/60" aria-hidden />
              </div>
              <button
                type="submit"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal text-teal-foreground"
                aria-label="Send message"
              >
                {draft.trim() ? <Send className="h-5 w-5" aria-hidden /> : <Mic className="h-5 w-5" aria-hidden />}
              </button>
            </form>
            <p className="mt-2 text-center text-[0.68rem] text-muted-foreground">
              A caring companion, not a medical service. In a crisis, please call a helpline.
            </p>
          </div>
        </div>
      </section>

      {/* Choose a guide */}
      <section
        className={`relative min-h-0 w-full flex-col overflow-y-auto bg-background ${
          view === "guides" ? "flex" : "hidden"
        } md:flex-1`}
      >
        <div className="px-5 pb-32 pt-6">
          <button
            type="button"
            onClick={() => setView(window.innerWidth < 768 ? "list" : "chat")}
            className="rounded-full p-1.5 text-teal hover:bg-mint/50"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>

          <h2 className="mt-4 font-display text-[2rem] font-bold leading-tight text-teal">Choose a Guide</h2>
          <p className="mt-1 text-[0.95rem] text-teal/75">Different perspectives. A kinder you.</p>

          <ul className="mt-5 space-y-2">
            {guides.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => openChat(g.id)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-colors ${
                    g.id === activeId ? "bg-blush/70" : "bg-muted/60 hover:bg-mint/40"
                  }`}
                >
                  <img
                    src={g.avatar}
                    alt=""
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.05rem] font-bold text-teal">{g.name}</span>
                    <span className="block text-[0.85rem] text-coral">{g.title}</span>
                    <span className="mt-1 block text-[0.85rem] leading-snug text-muted-foreground">{g.blurb}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-coral" aria-hidden />
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center font-display text-[1rem] italic text-gold">
            Different journeys.
            <br />
            A kinder tomorrow.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-t-[100%] bg-blush/60" aria-hidden />
      </section>
    </div>
  );
}
