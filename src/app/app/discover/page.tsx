"use client";

import { useState } from "react";
import {
  Crown,
  Plus,
  Search,
} from "lucide-react";

export default function DiscoverPage() {
  const [active, setActive] = useState("Sports");

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <span>DISCOVER</span>

          <h1>Find Your Sports World</h1>

          <p>
            Explore teams, players, competitions and
            trending communities.
          </p>
        </div>
      </div>

      <div className="discover-search">
        <Search size={20} />

        <input
          placeholder="Search teams, players, events..."
        />
      </div>

      <div className="discover-tabs">

        {[
          "Sports",
          "Teams",
          "Players",
          "Competitions",
        ].map((tab) => (

          <button
            key={tab}
            className={
              active === tab
                ? "active"
                : ""
            }
            onClick={() => setActive(tab)}
          >
            {tab}
          </button>

        ))}

      </div>

      <div className="discover-layout">

        <div>

          <div className="section-heading-row">
            <h2>Trending</h2>
            <button>View All</button>
          </div>

          <div className="trending-grid">

            {[
              ["Football", "⚽"],
              ["Basketball", "🏀"],
              ["Tennis", "🎾"],
              ["Boxing", "🥊"],
              ["Formula 1", "🏎️"],
              ["Cricket", "🏏"],
            ].map(([name, icon]) => (

              <div
                className="sport-discover-card"
                key={name}
              >
                <div>{icon}</div>

                <strong>{name}</strong>

                <span>Explore</span>
              </div>

            ))}

          </div>

          <div className="white-panel discover-list">

            <div className="panel-title">
              <h3>Popular Teams</h3>
              <button>View All</button>
            </div>

            {[
              ["Arsenal", "Premier League", "A"],
              [
                "Manchester United",
                "Premier League",
                "M",
              ],
              ["Chelsea", "Premier League", "C"],
              ["Lakers", "NBA", "L"],
            ].map((team) => (

              <div
                className="discover-team"
                key={team[0]}
              >

                <div className="team-logo">
                  {team[2]}
                </div>

                <div>
                  <strong>{team[0]}</strong>
                  <span>{team[1]}</span>
                </div>

                <button>
                  <Plus size={14} />
                  Follow
                </button>

              </div>

            ))}

          </div>

        </div>

        <aside>

          <div className="white-panel">

            <div className="panel-title">
              <h3>Your Interests</h3>
            </div>

            <div className="interest-tags">
              <span>Football</span>
              <span>Premier League</span>
              <span>Arsenal</span>
              <span>NBA</span>
              <span>Tennis</span>
            </div>

          </div>

          <div className="discover-promo">

            <Crown size={32} />

            <h3>Your Passion.</h3>
            <h3>Your Community.</h3>
            <h3>Your Rewards.</h3>

            <a href="/fan-hub">
              Explore Fan Rooms
            </a>

          </div>

        </aside>

      </div>
    </div>
  );
}