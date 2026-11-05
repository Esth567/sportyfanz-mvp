import AdminPermissionGuard from "@/components/admin/AdminPermissionGuard";
import PlayersManagement from "./players-management";

export default function PlayersPage() {
  return (
    <AdminPermissionGuard permission="players:manage">
      <PlayersManagement />
    </AdminPermissionGuard>
  );
}
