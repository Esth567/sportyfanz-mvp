import AdminPermissionGuard from "@/components/admin/AdminPermissionGuard";
import TriviaManagement from "./trivia-management";

export default function TriviaPage() {
  return (
    <AdminPermissionGuard permission="trivia:manage">
      <TriviaManagement />
    </AdminPermissionGuard>
  );
}
