import AdminPermissionGuard from "@/components/admin/AdminPermissionGuard";
import PredictionsManagement from "./predictions-management";

export default function PredictionsPage() {
  return (
    <AdminPermissionGuard permission="predictions:manage">
      <PredictionsManagement />
    </AdminPermissionGuard>
  );
}
