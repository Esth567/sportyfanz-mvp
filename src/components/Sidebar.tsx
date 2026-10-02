"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Award,
  ChevronRight,
  Crown,
  Gift,
  Home,
  MessageCircle,
  Radio,
  Search,
  Settings,
  Target,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Live & Matches",
    href: "/live",
    icon: Radio,
  },
  {
    label: "Participate",
    href: "/participate",
    icon: Target,
  },
  {
    label: "Discover",
    href: "/discover",
    icon: Search,
  },
  {
    label: "My Kingdom",
    href: "/kingdom",
    icon: Crown,
  },
  {
    label: "Fan Rooms",
    href: "/fanroom",
    icon: MessageCircle,
  },
  {
    label: "Rewards",
    href: "/rewards",
    icon: Gift,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sf-sidebar">
      {/* LOGO */}
      <div className="sf-logo">
        <div className="sf-logo-mark">
          <Crown size={25} strokeWidth={2.5} />
        </div>

        <div>
          <div className="sf-logo-name">SportyFanz</div>

          <div className="sf-logo-tagline">
            Every Sport. Every Fan. Every Moment.
          </div>
        </div>
      </div>

      <div className="sf-sidebar-divider" />

      {/* MAIN NAVIGATION */}
      <nav className="sf-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`sf-nav-item ${
                active ? "active" : ""
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* COMMUNITY */}
      <div className="sf-sidebar-section">
        <div className="sf-sidebar-label">
          COMMUNITY
        </div>

        <Link
          href="/onboarding"
          className={`sf-nav-item ${
            pathname.startsWith("/onboarding")
              ? "active"
              : ""
          }`}
        >
          <Users size={17} />
          <span>Join SportyFanz</span>
        </Link>

        <Link
          href="/participate"
          className="sf-nav-item"
        >
          <Award size={17} />
          <span>Challenges</span>
        </Link>

        <button className="sf-nav-item" type="button">
          <Trophy size={17} />
          <span>Leaderboards</span>
        </button>
      </div>

      {/* BOTTOM */}
      <div className="sf-sidebar-bottom">
        <button className="sf-nav-item" type="button">
          <Settings size={17} />
          <span>Settings</span>
        </button>

        <Link
          href="/kingdom"
          className="sf-user-mini"
        >
          <div className="sf-avatar">E</div>

          <div className="sf-user-info">
            <strong>Esther</strong>
            <span>Champion Fan</span>
          </div>

          <span className="ml-auto text-slate-400">
            →
          </span>
        </Link>
      </div>
    </aside>
  );
}