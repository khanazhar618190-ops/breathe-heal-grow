import { createFileRoute, Outlet } from "@tanstack/react-router";
import { LayoutGrid, UserCog, ShieldAlert } from "lucide-react";

import { RoleShell } from "@/components/role-shell";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const links = [
  { to: "/admin", label: "Overview", icon: LayoutGrid, exact: true },
  { to: "/admin/users", label: "Users", icon: UserCog },
  { to: "/admin/moderation", label: "Moderation", icon: ShieldAlert },
] as const;

function AdminLayout() {
  return (
    <RoleShell
      links={links}
      roleLabel="Admin"
      initials="AD"
      footer="Admin actions are logged. Handle personal data with care."
    >
      <Outlet />
    </RoleShell>
  );
}
