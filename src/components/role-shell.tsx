import { Link } from "@tanstack/react-router";
import { Bell, LogOut } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Wordmark } from "@/components/site-header";

export type RoleNavLink = {
  to: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
};

export function RoleShell({
  links,
  roleLabel,
  initials,
  footer,
  children,
}: {
  links: readonly RoleNavLink[];
  roleLabel: string;
  initials: string;
  footer?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3">
          <Wordmark />
          <span className="hidden rounded-full bg-sand/70 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-gold sm:block">
            {roleLabel}
          </span>
          <nav className="ml-1 flex items-center gap-1 overflow-x-auto">
            {links.map(({ to, label, icon: Icon, exact }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: Boolean(exact) }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-[0.8rem] font-medium text-foreground/70 transition-colors hover:bg-mint/50 hover:text-teal"
                activeProps={{ className: "bg-mint/70 text-teal" }}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Bell className="hidden h-4 w-4 text-teal sm:block" aria-hidden />
            <span className="hidden h-9 w-9 items-center justify-center rounded-full bg-blush font-display text-xs font-bold text-coral sm:flex">
              {initials}
            </span>
            <Link to="/auth" className="btn-base btn-outline-coral">
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-9">{children}</main>

      <footer className="bg-mint/50 py-5 text-center text-[0.72rem] text-teal">
        {footer ?? "You are not alone. If you need urgent help, call a helpline any time."}
      </footer>
    </div>
  );
}
