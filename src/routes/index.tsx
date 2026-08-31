import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Megaphone,
  Handshake,
  HandHeart,
  Headphones,
  Phone,
  Heart,
} from "lucide-react";

import { SiteHeader, SiteFooter } from "@/components/site-header";
import heroCalm from "@/assets/hero-calm.jpg";
import paperCommunity from "@/assets/paper-community.jpg";
import ruralProgram from "@/assets/rural-program.jpg";
import corporateProgram from "@/assets/corporate-program.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Breathe Heal Grow — Making Mental Health a Priority for All" },
      {
        name: "description",
        content:
          "Awareness, accessible help and affordable care. Find a therapist, call a helpline or support our rural and corporate mental health programs.",
      },
      { property: "og:title", content: "Breathe Heal Grow — Mental Health for All" },
      {
        property: "og:description",
        content: "Awareness, accessibility and affordability in mental health care.",
      },
    ],
  }),
  component: Landing,
});

const pillars = [
  {
    icon: Megaphone,
    title: "Awareness",
    body: "Spreading knowledge to break the silence around mental health.",
    tone: "bg-mint text-teal",
    label: "text-teal",
  },
  {
    icon: Handshake,
    title: "Accessibility",
    body: "Making professional help easy to reach for everyone who needs it.",
    tone: "bg-blush text-coral",
    label: "text-coral",
  },
  {
    icon: HandHeart,
    title: "Affordability",
    body: "Ensuring mental healthcare is affordable and available to all.",
    tone: "bg-sand text-gold",
    label: "text-gold",
  },
];

const actions = [
  {
    icon: Headphones,
    title: "Speak to an expert",
    body: "Connect with a qualified therapist or counsellor.",
    cta: "Find a therapist",
    btn: "btn-teal",
    tone: "bg-mint text-teal",
    label: "text-teal",
  },
  {
    icon: Phone,
    title: "Helplines",
    body: "Talk to someone who understands. We're here.",
    cta: "Call a helpline",
    btn: "btn-coral",
    tone: "bg-blush text-coral",
    label: "text-coral",
  },
  {
    icon: Heart,
    title: "Be a part of the change",
    body: "Your support can bring hope and healing to many lives.",
    cta: "Donate now",
    btn: "btn-gold",
    tone: "bg-sand text-gold",
    label: "text-gold",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <img
          src={heroCalm}
          alt="A woman sitting on a hilltop watching the sunrise over misty mountains"
          width={1600}
          height={912}
          className="h-[62vh] min-h-[380px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold leading-[1.08] text-teal sm:text-5xl">
                Making Mental Health
                <br />
                a Priority for All
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/80">
                We create awareness, provide accessible help and ensure support is available for
                everyone, everywhere.
              </p>
              <button type="button" className="btn-base btn-coral mt-7">
                Know more about us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-border">
          {pillars.map(({ icon: Icon, title, body, tone, label }) => (
            <div key={title} className="flex items-start gap-4 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone}`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className={`eyebrow ${label}`}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-7xl px-5 pb-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="grid overflow-hidden rounded-lg bg-mint/50 shadow-soft sm:grid-cols-[1fr_1.1fr]">
            <div className="rule-teal p-7">
              <h2 className="text-xl font-bold text-teal">Rural Program</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Taking mental health support to rural communities and creating a healthier tomorrow.
              </p>
              <button type="button" className="btn-base btn-teal mt-6">
                Explore
              </button>
            </div>
            <img
              src={ruralProgram}
              alt="Community mental health circle gathered under a tree in a village"
              loading="lazy"
              width={1200}
              height={800}
              className="h-full min-h-[220px] w-full object-cover"
            />
          </article>

          <article className="grid overflow-hidden rounded-lg bg-blush/60 shadow-soft sm:grid-cols-[1fr_1.1fr]">
            <div className="rule-coral p-7">
              <h2 className="text-xl font-bold text-coral">Corporate Program</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                Partnering with organizations to build mentally healthy workplaces and communities.
              </p>
              <button type="button" className="btn-base btn-coral mt-6">
                Explore
              </button>
            </div>
            <img
              src={corporateProgram}
              alt="Facilitator leading a workplace wellbeing session for employees"
              loading="lazy"
              width={1200}
              height={800}
              className="h-full min-h-[220px] w-full object-cover"
            />
          </article>
        </div>
      </section>

      {/* Get help band */}
      <section className="bg-blush/50 py-12">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:grid-cols-3">
          {actions.map(({ icon: Icon, title, body, cta, btn, tone, label }) => (
            <div key={title} className="flex items-start gap-4">
              <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${tone}`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h3 className={`eyebrow ${label}`}>{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">{body}</p>
                <button type="button" className={`btn-base ${btn} mt-4`}>
                  {cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Foundation story */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="rule-coral text-3xl font-bold leading-tight text-coral sm:text-4xl">
          Mental Health
          <br />
          Foundation
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.4fr_0.9fr]">
          <div className="self-start rounded-lg bg-sand/70 p-7">
            <p className="text-sm leading-relaxed text-foreground/80">
              We are a mental health organization with a life-affirming approach. Through research,
              content, community and a holistic approach for all caregivers.
            </p>
            <button type="button" className="btn-base btn-coral mt-6">
              Know more
            </button>
          </div>
          <img
            src={paperCommunity}
            alt="Layered paper-cut illustration of people helping each other"
            loading="lazy"
            width={1200}
            height={1008}
            className="w-full rounded-lg object-cover"
          />
          <div className="self-start rounded-lg bg-blush/60 p-7">
            <h3 className="text-lg font-bold leading-tight text-coral">Corporate Program</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Our workplace wellbeing program helps organizations prioritize mental health, using
              data-driven insights and a customized roadmap for long-term cultural change.
            </p>
            <button type="button" className="btn-base btn-outline-coral mt-6">
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* Quote mosaic */}
      <section>
        <h2 className="mx-auto max-w-7xl px-5 pb-6 text-3xl font-extrabold uppercase tracking-tight text-coral sm:text-4xl">
          Breathe · Heal · Grow
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-teal p-8 text-teal-foreground">
            <p className="text-sm leading-relaxed">
              “More than ever, we need to remind ourselves to be vulnerable, human and sensitive.”
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest opacity-80">
              A caregiver
            </p>
          </div>
          <div className="flex min-h-[220px] items-end bg-blush p-8">
            <span className="font-display text-3xl font-bold uppercase tracking-wide text-card">
              Breathe
            </span>
          </div>
          <div className="flex min-h-[220px] items-center justify-center bg-sky p-8">
            <span className="font-display text-3xl font-bold uppercase tracking-wide text-card">
              Heal
            </span>
          </div>
          <div className="flex min-h-[220px] items-center bg-sand p-8">
            <span className="font-display text-3xl font-bold uppercase leading-tight text-coral">
              You
              <br />
              are
              <br />
              not
              <br />
              alone
            </span>
          </div>
        </div>
      </section>

      {/* Helpline strip */}
      <section className="grid lg:grid-cols-2">
        <div className="bg-coral p-9 text-coral-foreground">
          <h3 className="text-xl font-bold">Call a helpline</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed opacity-90">
            Talk to someone who understands. We're here for you, any hour of the day.
          </p>
          <button
            type="button"
            className="btn-base mt-6 border border-current bg-transparent text-coral-foreground"
          >
            View helplines
          </button>
        </div>
        <div className="bg-sand/70 p-9">
          <h3 className="text-xl font-bold text-coral">From our helpline partner</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-foreground/80">
            Our helpline partner provides 24/7 emotional support and guidance by trained
            professionals.
          </p>
          <Link to="/auth" className="btn-base btn-coral mt-6">
            Create an account
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
