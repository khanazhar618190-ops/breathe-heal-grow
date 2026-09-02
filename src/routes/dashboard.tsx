import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, NotebookPen, LineChart, LogOut, Bell, MessageCircle } from "lucide-react";

import { Wordmark } from "@/components/site-header";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const navLinks = [
  { to: "/dashboard", label: "Home", icon: LayoutGrid, exact: true },
  { to: "/dashboard/chat", label: "Saathi", icon: MessageCircle, exact: false },
  { to: "/dashboard/journal", label: "Journal", icon: NotebookPen, exact: false },
  { to: "/dashboard/progress", label: "Progress", icon: LineChart, exact: false },
] as const;

function DashboardLayout() {
  const immersive = useRouterState({
    select: (s) => s.location.pathname.startsWith("/dashboard/chat"),
  });

  return (
    <div className={immersive ? "flex h-dvh flex-col overflow-hidden bg-background" : "min-h-screen bg-background"}>
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3">
          <Wordmark />
          <nav className="ml-2 flex items-center gap-1 overflow-x-auto">
            {navLinks.map(({ to, label, icon: Icon, exact }) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact }}
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
              AK
            </span>
            <Link to="/auth" className="btn-base btn-outline-coral">
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <main className={immersive ? "min-h-0 flex-1" : "mx-auto max-w-6xl px-5 py-9"}>
        <Outlet />
      </main>

      {!immersive && (
        <footer className="bg-mint/50 py-5 text-center text-[0.72rem] text-teal">
          You are not alone. If you need urgent help, call a helpline any time.
        </footer>
      )}
    </div>
  );
}
