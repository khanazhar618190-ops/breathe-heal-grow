import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Check, Ban } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users & Roles — Breathe Heal Grow Admin" },
      {
        name: "description",
        content: "Review members, verify therapists and manage roles across the platform.",
      },
      { property: "og:title", content: "Users & Roles — Breathe Heal Grow Admin" },
      { property: "og:description", content: "Members, therapist verification and role management." },
    ],
  }),
  component: AdminUsers,
});

const rows = [
  { name: "Azhar Khan", email: "azhar@example.com", role: "Patient", status: "Active" },
  { name: "Dr. Meera Iyer", email: "meera@example.com", role: "Therapist", status: "Verified" },
  { name: "Dr. Sanjay Bose", email: "sanjay@example.com", role: "Therapist", status: "Pending" },
  { name: "Priya Sharma", email: "priya@example.com", role: "Patient", status: "Active" },
  { name: "Ops Team", email: "ops@breathehealgrow.org", role: "Admin", status: "Active" },
  { name: "Rahul Verma", email: "rahul@example.com", role: "Patient", status: "Suspended" },
];

const roleTone: Record<string, string> = {
  Patient: "bg-mint/70 text-teal",
  Therapist: "bg-blush/70 text-coral",
  Admin: "bg-sand/70 text-gold",
};

const filters = ["All", "Patient", "Therapist", "Admin"] as const;

function AdminUsers() {
  const [role, setRole] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const shown = rows.filter(
    (r) =>
      (role === "All" || r.role === role) &&
      (r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.email.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="rule-teal text-3xl font-bold text-teal sm:text-4xl">Users & roles</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">
          One pending therapist verification. Role changes take effect immediately.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-4">
        <label className="relative block w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email"
            className="field-input pl-10"
            aria-label="Search users"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setRole(f)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                role === f
                  ? "border-coral bg-coral text-coral-foreground"
                  : "border-border bg-card text-foreground/75 hover:border-coral"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <section className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mint/50 text-[0.62rem] uppercase tracking-[0.14em] text-teal">
            <tr>
              <th className="px-5 py-3 font-bold">Name</th>
              <th className="hidden px-5 py-3 font-bold sm:table-cell">Email</th>
              <th className="px-5 py-3 font-bold">Role</th>
              <th className="px-5 py-3 font-bold">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {shown.map((r) => (
              <tr key={r.email} className="border-t border-border/70">
                <td className="px-5 py-4 font-semibold text-teal">{r.name}</td>
                <td className="hidden px-5 py-4 text-xs text-foreground/70 sm:table-cell">{r.email}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-widest ${roleTone[r.role]}`}>
                    {r.role}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-foreground/70">{r.status}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-3 text-teal">
                    <button type="button" aria-label={`Approve ${r.name}`}>
                      <Check className="h-4 w-4" aria-hidden />
                    </button>
                    <button type="button" aria-label={`Suspend ${r.name}`} className="text-coral">
                      <Ban className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No users match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
