import { Link } from "@tanstack/react-router";
import { Search, User } from "lucide-react";

const navItems = [
  "Mental Health Matters",
  "Find Help",
  "About Us",
  "Initiatives",
  "Impact",
  "Media",
  "Blog",
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`block font-display leading-[0.95] ${className}`} aria-label="Breathe Heal Grow home">
      <span className="block text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-coral">
        Breathe
      </span>
      <span className="block text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-coral">
        Heal
      </span>
      <span className="block text-[0.78rem] font-extrabold uppercase tracking-[0.08em] text-coral">
        Grow
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3">
        <Wordmark />
        <nav className="hidden flex-1 items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <span
              key={item}
              className="cursor-pointer text-[0.8rem] font-medium text-foreground/80 transition-colors hover:text-coral"
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Search className="hidden h-4 w-4 text-teal sm:block" aria-hidden />
          <Link to="/auth" aria-label="Login or register">
            <User className="h-4 w-4 text-teal" aria-hidden />
          </Link>
          <span className="hidden text-[0.7rem] font-semibold tracking-widest text-muted-foreground sm:block">
            EN
          </span>
          <button type="button" className="btn-base btn-coral">
            Donate
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="bg-sky/60 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-5 text-[0.78rem] font-medium text-teal">
          <span className="cursor-pointer underline underline-offset-4">Terms and Conditions</span>
          <span className="cursor-pointer underline underline-offset-4">Privacy Policy</span>
          <span className="cursor-pointer underline underline-offset-4">Contact</span>
        </div>
      </div>
      <div className="bg-coral py-3 text-center text-[0.72rem] text-coral-foreground">
        © 2026 All rights reserved. Breathe Heal Grow Foundation.
      </div>
    </footer>
  );
}
