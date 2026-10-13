"use client";

import { useEffect, useState } from "react";
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

export default function Profile() {
  const [fan, setFan] = useState<FanProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
    fan.name?.trim() ||
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
            {initials}
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

          </div>

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