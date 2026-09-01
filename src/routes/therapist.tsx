import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutGrid, Users, CalendarDays } from "lucide-react";

import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/therapist")({
  component: TherapistLayout,
});

const links = [
  { to: "/therapist", label: "Overview", icon: LayoutGrid, exact: true },
  { to: "/therapist/patients", label: "Patients", icon: Users },
  { to: "/therapist/schedule", label: "Schedule", icon: CalendarDays },
] as const;

function TherapistLayout() {
  return (
    <RoleShell
      links={links}
      roleLabel="Therapist"
      initials="DM"
      footer="Care notes are confidential. Escalate risk flags within 24 hours."
    >
      <Outlet />
    </RoleShell>
  );
}
