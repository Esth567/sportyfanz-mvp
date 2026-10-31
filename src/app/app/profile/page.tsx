"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Target,
  MessageCircle,
  Activity,
} from "lucide-react";

type FanProfile = {
  id: number;
  name: string | null;
  username: string | null;
  email: string;

  fanLevel: string;

  totalPoints: number;
  currentPoints: number;

  matchesWatched: number;
  challengesCompleted: number;
  fanRoomsJoined: number;

  avatarUrl: string | null;
};

const AVATARS = [
  "/avatars/fan-1.svg",
  "/avatars/fan-2.svg",
  "/avatars/fan-3.svg",
  "/avatars/fan-4.svg",
  "/avatars/fan-5.svg",
  "/avatars/fan-6.svg",
];

export default function Profile() {
  const [fan, setFan] = useState<FanProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState("");

  async function handleSaveAvatar() {
  if (!selectedAvatar || savingAvatar) return;

  setSavingAvatar(true);
  setAvatarMessage("");

  try {
    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatarUrl: selectedAvatar,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to save avatar.");
    }

    setFan((current) =>
      current
        ? { ...current, avatarUrl: data.avatarUrl }
        : current
    );

    setAvatarMessage("Avatar updated successfully.");
  } catch (error) {
    setAvatarMessage(
      error instanceof Error
        ? error.message
        : "Unable to save avatar."
    );
  } finally {
    setSavingAvatar(false);
  }
}

 async function handleLogout() {
  if (loggingOut) return;

  setLoggingOut(true);

  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed.");
    }

    router.replace("/login");
    router.refresh();
  } catch (error) {
    console.error("Unable to log out:", error);
    setLoggingOut(false);
  }
}

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        const response = await fetch(
          "/api/profile",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const data = await response.json();

        if (active && data.user) {
          setFan(data.user);
        }
      } catch (error) {
        console.error(
          "Unable to load profile:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <span>YOUR PROFILE</span>
            <h1>My Profile</h1>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!fan) {
    return (
      <div className="page">
        <div className="page-header">
          <div>
            <span>YOUR PROFILE</span>
            <h1>My Profile</h1>
            <p>
              We couldn't load your profile.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const displayName =
    fan.username ||
    fan.email.split("@")[0];

  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const fanLevel =
    fan.fanLevel
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );

  /*
   * Until we introduce a dedicated level-progress
   * system, show points as the user's current progress.
   */
  const progress =
    fan.totalPoints > 0
      ? Math.min(
          100,
          Math.round(
            (fan.currentPoints /
              Math.max(fan.totalPoints, 1)) *
              100
          )
        )
      : 0;

     return (
      <div className="page">

       {/* PROFILE HEADER */}
      <div className="card">

        <div className="profile-head">

         <div className="big-avatar">
       {fan.avatarUrl ? (
        <img
          src={fan.avatarUrl}
          alt="Your fan avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "50%",
           }}
          />
          ) : (
           initials
           )}
         </div>      
          <div className="profile-meta">

            <h1>
              {displayName}
            </h1>

            <p>
              Fan Level: {fanLevel}
            </p>

            <p style={{ marginTop: 8 }}>
              {fan.totalPoints.toLocaleString()} fan
              points · {fan.matchesWatched} matches
              watched
            </p>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              style={{ marginTop: 12 }}
            >
             {loggingOut ? "Logging out..." : "Log out"}
            </button>

          </div>

        </div>

        <div style={{ marginTop: 20 }}>
  <h3 style={{ marginBottom: 12 }}>
    Choose Your Fan Avatar
  </h3>

  <div
    style={{
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    {AVATARS.map((avatar) => (
      <button
        key={avatar}
        type="button"
        onClick={() => {
          setSelectedAvatar(avatar);
          setAvatarMessage("");
        }}
        aria-label={`Select ${avatar.split("/").pop()}`}
        aria-pressed={selectedAvatar === avatar}
        style={{
          padding: 3,
          borderRadius: "50%",
          border:
            selectedAvatar === avatar
              ? "3px solid #f5b82e"
              : "3px solid transparent",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <img
          src={avatar}
          alt=""
          style={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            display: "block",
          }}
        />
       </button>
      ))}
     </div>

      <button
       type="button"
       onClick={handleSaveAvatar}
       disabled={!selectedAvatar || savingAvatar}
       style={{ marginTop: 14 }}
      >
        {savingAvatar ? "Saving..." : "Save Avatar"}
      </button>

       {avatarMessage && (
        <p style={{ marginTop: 8 }} role="status">
         {avatarMessage}
         </p>
        )}
       </div>
        <div style={{ marginTop: 18 }}>

          <div className="stat-label">

            <span>
              Current Points
            </span>

            <b>
              {fan.currentPoints.toLocaleString()}
            </b>

            <span>
              Fan Level: {fanLevel}
            </span>

          </div>

          <div className="progress">
            <i
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>

      </div>

      {/* PROFILE DATA */}
      <div
        className="two-col"
        style={{ marginTop: 14 }}
      >

        {/* FAN STATS */}
        <section className="card">

          <div className="section-title">
            <h2>My Fan Stats</h2>
          </div>

          <div className="list">

            <div className="list-item">
              <b>Fan Points</b>

              <span>
                {fan.totalPoints.toLocaleString()}
              </span>
            </div>

            <div className="list-item">
              <b>Matches Watched</b>

              <span>
                {fan.matchesWatched}
              </span>
            </div>

            <div className="list-item">
              <b>Challenges Completed</b>

              <span>
                {fan.challengesCompleted}
              </span>
            </div>

            <div className="list-item">
              <b>Fan Rooms Joined</b>

              <span>
                {fan.fanRoomsJoined}
              </span>
            </div>

          </div>

        </section>

        {/* FAN KINGDOM */}
        <section className="card">

          <div className="section-title">
            <h2>My Fan Kingdom</h2>
          </div>

          <div className="list">

            <div className="list-item">
              <b>
                <Trophy size={15} />
                Fan Level
              </b>

              <span>
                {fanLevel}
              </span>
            </div>

            <div className="list-item">
              <b>
                <Target size={15} />
                Challenges
              </b>

              <span>
                {fan.challengesCompleted}
              </span>
            </div>

            <div className="list-item">
              <b>
                <Activity size={15} />
                Matches
              </b>

              <span>
                {fan.matchesWatched}
              </span>
            </div>

            <div className="list-item">
              <b>
                <MessageCircle size={15} />
                Fan Rooms
              </b>

              <span>
                {fan.fanRoomsJoined}
              </span>
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}