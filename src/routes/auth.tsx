import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Minus } from "lucide-react";

import { SiteHeader, SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login or Create an Account — Breathe Heal Grow" },
      {
        name: "description",
        content:
          "Sign in or create your Breathe Heal Grow account to support mental health programs, donate and access help.",
      },
      { property: "og:title", content: "Login or Create an Account — Breathe Heal Grow" },
      {
        property: "og:description",
        content: "Access helplines, therapists and donation support with a Breathe Heal Grow account.",
      },
    ],
  }),
  component: AuthPage,
});

const faqs = [
  {
    q: "How can I make a donation?",
    heading: "Donate on our website",
    points: [
      "For Indian citizens, organizations or NRIs: contribute via payment gateway, bank transfer or cheque after completing the mandatory information.",
      "For foreign nationals, organizations or OCI card holders: donate exclusively through regular banking channels upon submission of the required details.",
    ],
    heading2: "Other ways to donate",
    points2: [
      "Through partner giving platforms — visit our dedicated page to make your donation seamlessly.",
      "Through workplace giving — support us via your employer and help us continue making a difference.",
    ],
  },
];

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="relative block">
      <span className="field-label">{label}</span>
      <input type={type} placeholder={placeholder} className="field-input" />
    </label>
  );
}

function AuthPage() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [role, setRole] = useState<RoleValue>("patient");
  const navigate = useNavigate();
  const faq = faqs[0]!;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        {/* Queries panel */}
        <aside className="bg-mint/70 px-6 py-12 sm:px-10">
          <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-teal">
            Queries
            <br />
            related to
            <br />
            donate
          </h2>

          <div className="mt-7 flex items-center justify-between rounded-md bg-teal px-5 py-4 text-teal-foreground">
            <span className="text-sm font-semibold">{faq.q}</span>
            <Minus className="h-4 w-4" aria-hidden />
          </div>

          <h3 className="mt-7 text-sm font-bold text-teal">{faq.heading}</h3>
          <ul className="mt-3 space-y-3">
            {faq.points.map((p) => (
              <li key={p} className="flex gap-3 text-xs leading-relaxed text-foreground/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {p}
              </li>
            ))}
          </ul>

          <h3 className="mt-7 text-sm font-bold text-teal">{faq.heading2}</h3>
          <ul className="mt-3 space-y-3">
            {faq.points2.map((p) => (
              <li key={p} className="flex gap-3 text-xs leading-relaxed text-foreground/75">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                {p}
              </li>
            ))}
          </ul>
        </aside>

        {/* Form panel */}
        <main className="bg-card px-6 py-12 sm:px-12">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl font-bold uppercase tracking-tight text-coral sm:text-[2.1rem]">
              {mode === "register" ? "Create an account" : "Login to your account"}
            </h1>
            <p className="mt-3 text-xs text-muted-foreground">
              {mode === "register" ? "If you already have an account " : "New here? "}
              <button
                type="button"
                onClick={() => setMode(mode === "register" ? "login" : "register")}
                className="font-semibold text-teal underline underline-offset-4"
              >
                {mode === "register" ? "Login" : "Create an account"}
              </button>
            </p>

            <div className="mt-7 rounded-lg bg-mint/50 p-5">
              <p className="text-sm font-bold text-teal">Continue as</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Demo mode — pick the dashboard you want to explore.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {roleOptions.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                      role === r.value
                        ? "border-coral bg-coral text-coral-foreground"
                        : "border-border bg-card text-foreground/80 hover:border-coral"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: roleOptions.find((r) => r.value === role)!.to });
              }}
            >
              {mode === "register" && (
                <label className="relative block">
                  <select className="field-input appearance-none pt-4 pb-4">
                    <option>I am an Indian Citizen / NRI</option>
                    <option>I am a Foreign National / OCI Card Holder</option>
                    <option>I represent an organization</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                </label>
              )}

              {mode === "register" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="First Name *" />
                  <Field label="Last Name *" />
                  <Field label="PAN Number *" />
                  <Field label="Phone Number *" placeholder="+91" />
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email ID *" type="email" />
                <Field label="Password *" type="password" />
              </div>

              {mode === "register" && (
                <div>
                  <p className="text-sm font-semibold text-coral">Please select the right answer</p>
                  <div className="mt-3 flex items-center gap-6 text-sm text-foreground/80">
                    <span>8 + 67 =</span>
                    {["75", "49"].map((v) => (
                      <label key={v} className="flex cursor-pointer items-center gap-2">
                        <input type="radio" name="captcha" className="accent-coral" />
                        {v}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn-base btn-outline-coral w-full sm:w-64"
              >
                {mode === "register" ? "Sign up" : "Login"}
              </button>
            </form>

            <p className="mt-5 text-[0.68rem] leading-relaxed text-muted-foreground">
              Please share your details accurately to sign up.
              <br />
              By clicking {mode === "register" ? "Sign up" : "Login"} you agree to our{" "}
              <span className="cursor-pointer text-teal underline underline-offset-4">
                Terms and Conditions
              </span>
              .
            </p>
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}
