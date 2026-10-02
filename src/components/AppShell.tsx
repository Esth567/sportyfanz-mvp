"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


import {
  Bell,
  ChevronRight,
  Crown,
  Gift,
  Home,
  MessageCircle,
  Radio,
  Search,
  Target,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

import Sidebar from "./Sidebar";
import SearchBar from "./search-bar";
import Notifications from "./notification";
import UserProfile from "./userProfile";

type Props = {
  children: ReactNode;
};

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Live & Matches",
    href: "/matches",
    icon: Radio,
  },
  {
    label: "Sports",
    href: "/discover?sport=all",
    icon: Trophy,
  },
  {
    label: "Competitions",
    href: "/discover?type=competitions",
    icon: Trophy,
  },
  {
    label: "Teams",
    href: "/discover?type=teams",
    icon: Users,
  },
  {
    label: "Players",
    href: "/discover?type=players",
    icon: UserRound,
  },
  {
    label: "Fan Rooms",
    href: "/fan-hub",
    icon: MessageCircle,
  },
  {
    label: "Challenges",
    href: "/participate",
    icon: Target,
  },
  {
    label: "Rewards",
    href: "/reward",
    icon: Gift,
  },
  {
    label: "My Kingdom",
    href: "/my-kingdom",
    icon: Crown,
  },
];

export default function SportyFanzShell({
  children,
}: Props) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#eef3f7] text-slate-900">
      
      <main className="sf-app">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <section className="sf-main">
        {/* TOP BAR */}
        <header className="sf-topbar">
          <SearchBar />

          <div className="sf-top-actions">
            <Notifications />

            <UserProfile />
          </div>
        </header>

        {/* PAGE */}
        <div className="sf-content">
          {children}
        </div>
      </section>
    </main>

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#062c4d]">
        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center px-6">

          {/* LOGO */}
          <Link
            href="/"
            className="flex min-w-[230px] items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f4c430] to-[#f7d85b] text-2xl shadow-lg">
              👑
            </div>

            <div>
              <div className="text-[23px] font-extrabold tracking-tight text-white">
                SportyFanz
              </div>

              <div className="text-[9px] font-medium tracking-wide text-slate-300">
                Every Sport. Every Fan. Every Moment.
              </div>
            </div>
          </Link>

          {/* SEARCH */}
          <div className="mx-8 flex max-w-[480px] flex-1 items-center">
            <div className="flex w-full items-center gap-3 rounded-full bg-white/10 px-4 py-2.5">
              <Search
                size={17}
                className="text-slate-300"
              />

              <input
                type="text"
                placeholder="Search teams, players, events..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-5">

            <button
              type="button"
              className="relative rounded-full p-2 text-white hover:bg-white/10"
            >
              <Bell size={19} />

              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#55d66f]" />
            </button>

            <Link
              href="/my-kingdom"
              className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-white/10"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#f2c94c] to-[#ff8a00] text-sm font-bold text-white">
                E
              </div>

              <div className="hidden lg:block">
                <div className="text-xs font-bold text-white">
                  Esther
                </div>

                <div className="text-[9px] text-slate-300">
                  Champion Fan
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="mx-auto flex max-w-[1500px]">

        {/* SIDEBAR */}
        <aside className="hidden w-[235px] shrink-0 border-r border-slate-200 bg-white lg:block">
          <div className="sticky top-[72px] p-4">

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                const basePath = item.href.split("?")[0];

                const active =
                  basePath === "/"
                    ? pathname === "/"
                    : pathname.startsWith(basePath);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-gradient-to-r from-[#0a9f67] to-[#42cf72] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#062c4d]"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        active
                          ? "text-white"
                          : "text-slate-500 group-hover:text-[#062c4d]"
                      }
                    />

                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="my-5 border-t border-slate-200" />

            {/* CHALLENGE CARD */}
            <Link
              href="/participate"
              className="block rounded-2xl bg-[#062c4d] p-4 text-white"
            >
              <div className="mb-2 flex items-center gap-2">
                <Target
                  size={17}
                  className="text-[#58d57b]"
                />

                <span className="text-sm font-bold">
                  Fan Challenges
                </span>
              </div>

              <p className="text-xs leading-5 text-slate-300">
                Predict, participate and earn rewards from your
                sports knowledge.
              </p>

              <div className="mt-3 flex items-center justify-between text-xs font-bold">
                <span className="text-[#58d57b]">
                  Explore
                </span>

                <ChevronRight size={15} />
              </div>
            </Link>
          </div>
        </aside>

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}