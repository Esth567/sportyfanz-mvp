import AdminPermissionGuard from "@/components/admin/AdminPermissionGuard";
import FanRoomsManagement from "./fanrooms-management";

export default function FanroomsPage() {
  return (
    <AdminPermissionGuard permission="fanrooms:manage">
      <FanRoomsManagement />
    </AdminPermissionGuard>
  );
}
