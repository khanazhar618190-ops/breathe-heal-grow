import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MessageCircle, FileText } from "lucide-react";

export const Route = createFileRoute("/therapist/patients")({
  head: () => ({
    meta: [
      { title: "Caseload — Breathe Heal Grow Therapist" },
      {
        name: "description",
        content: "Search your caseload, review mood trends and open confidential session notes.",
      },
      { property: "og:title", content: "Caseload — Breathe Heal Grow Therapist" },
      {
        property: "og:description",
        content: "Search patients, review trends and open session notes.",
      },
    ],
  }),
  component: TherapistPatients,
});

const patients = [
  { name: "Azhar Khan", age: 27, since: "Jul 2026", trend: "Improving", flag: false, next: "09:30 today" },
  { name: "Priya Sharma", age: 34, since: "Sep 2026", trend: "New", flag: false, next: "11:00 today" },
  { name: "Rahul Verma", age: 22, since: "Mar 2026", trend: "Declining", flag: true, next: "14:15 today" },
  { name: "Neha Dutta", age: 41, since: "Jan 2026", trend: "Watch", flag: true, next: "16:00 today" },
  { name: "Imran Ali", age: 30, since: "May 2026", trend: "Stable", flag: false, next: "Thu 10:00" },
  { name: "Kavya Rao", age: 19, since: "Aug 2026", trend: "Improving", flag: false, next: "Fri 15:30" },
];

const trendTone: Record<string, string> = {
  Improving: "bg-mint/70 text-teal",
  Stable: "bg-secondary text-teal",
  New: "bg-sand/70 text-gold",
  Watch: "bg-sand/70 text-gold",
  Declining: "bg-blush/70 text-coral",
};

function TherapistPatients() {
  const [query, setQuery] = useState("");
  const shown = patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-8">
      <header>
        <h1 className="rule-teal text-3xl font-bold text-teal sm:text-4xl">Caseload</h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-foreground/75">
          38 people in your care. Notes are visible only to you and the clinical lead.
        </p>
      </header>

      <label className="relative block max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients"
          className="field-input pl-10"
          aria-label="Search patients"
        />
      </label>

      <section className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-mint/50 text-[0.62rem] uppercase tracking-[0.14em] text-teal">
            <tr>
              <th className="px-5 py-3 font-bold">Patient</th>
              <th className="hidden px-5 py-3 font-bold sm:table-cell">In care since</th>
              <th className="px-5 py-3 font-bold">Trend</th>
              <th className="hidden px-5 py-3 font-bold md:table-cell">Next session</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {shown.map((p) => (
              <tr key={p.name} className="border-t border-border/70">
                <td className="px-5 py-4">
                  <p className="font-semibold text-teal">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Age {p.age}
                    {p.flag ? " · flagged" : ""}
                  </p>
                </td>
                <td className="hidden px-5 py-4 text-xs text-foreground/70 sm:table-cell">{p.since}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-widest ${trendTone[p.trend]}`}>
                    {p.trend}
                  </span>
                </td>
                <td className="hidden px-5 py-4 text-xs text-foreground/70 md:table-cell">{p.next}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-3 text-teal">
                    <button type="button" aria-label={`Message ${p.name}`}>
                      <MessageCircle className="h-4 w-4" aria-hidden />
                    </button>
                    <button type="button" aria-label={`Open notes for ${p.name}`}>
                      <FileText className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No patients match “{query}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
