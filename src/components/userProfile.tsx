import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function UserProfile() {
  return (
    <Link
      href="/kingdom"
      className="sf-profile"
    >
      <div className="sf-avatar">
        E
      </div>

      <div>
        <strong>Esther</strong>
        <span>Champion Fan</span>
      </div>

      <ChevronDown size={15} />
    </Link>
  );
}