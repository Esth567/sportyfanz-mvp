import AdminPermissionGuard from "@/components/admin/AdminPermissionGuard";
import PollsManagement from "./polls-management";

export default function PollsPage() {
  return (
    <AdminPermissionGuard permission="polls:manage">
      <PollsManagement />
    </AdminPermissionGuard>
  );
}
