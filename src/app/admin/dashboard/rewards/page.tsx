import AdminPermissionGuard from "@/components/admin/AdminPermissionGuard";
import RewardsManagement from "./rewards-management";

export default function RewardsPage() {
  return (
    <AdminPermissionGuard permission="rewards:manage">
      <RewardsManagement />
    </AdminPermissionGuard>
  );
}
