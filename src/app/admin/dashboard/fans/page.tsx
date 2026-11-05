import AdminPermissionGuard from "@/components/admin/AdminPermissionGuard";
import FansManagement from "./fans-management";

export default function FansPage() {
  return (
    <AdminPermissionGuard permission="fans:support">
      <FansManagement />
    </AdminPermissionGuard>
  );
}
