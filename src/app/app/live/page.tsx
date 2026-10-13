"use client";

import { useState } from "react";
import { Star, MessageCircle } from "lucide-react";

const fanMessages = [
  {
    user: "EmmyGunner",
    text: "Saka is on fire today! 🔥",
    time: "7:12 PM",
    avatar: "E",
  },
  {
    user: "BlueForever",
    text: "Chelsea will equalise soon.",
    time: "7:14 PM",
    avatar: "B",
  },
  {
    user: "KennyFC",
    text: "That goal was beautiful!",
    time: "7:16 PM",
    avatar: "K",
  },
  {
    user: "FootballQueen",
    text: "Who do you think will score next?",
    time: "7:18 PM",
    avatar: "F",
  },
];

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="page">

      <div className="page-header">
        <div>
          <span>MATCH CENTRE</span>

          <h1>Live & Matches</h1>

          <p>
            Follow every moment, every stat and every fan reaction.
          </p>
        </div>
      </div>

      <div className="match-centre-layout">

        <div>

          <div className="big-match-card">

            <div className="match-top">

              <div>
                <span className="live-pill">
                  <span />
                  LIVE
                </span>

                <span className="match-time">
                  72:34
                </span>
              </div>

              <span className="league-name">
                Premier League
              </span>

            </div>

            <div className="score-area">

              <div className="large-team">
                <div className="large-team-logo arsenal">
                  A
                </div>

                <strong>Arsenal</strong>
                <span>Home</span>
              </div>

              <div className="score">
                <strong>2 - 1</strong>
                <span>Emirates Stadium</span>
              </div>

              <div className="large-team">
                <div className="large-team-logo chelsea">
                  C
                </div>

                <strong>Chelsea</strong>
                <span>Away</span>
              </div>

            </div>

            <div className="match-tabs">

              {[
                "Overview",
                "Stats",
                "Lineups",
                "Player Performance",
                "Fan Room",
                "More",
              ].map((tab) => (
                <button
                  key={tab}
                  className={
                    activeTab === tab
                      ? "active"
                      : ""
                  }
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}

            </div>
          </div>

          <div className="match-lower-grid">

            <div className="white-panel">

              <div className="panel-title">
                <h3>Match Timeline</h3>
              </div>

              <div className="timeline">

                <TimelineItem
                  minute="72'"
                  icon="⚽"
                  title="Goal - Arsenal"
                  player="Saka"
                />

                <TimelineItem
                  minute="68'"
                  icon="🔄"
                  title="Substitution - Chelsea"
                  player="Jackson on, Nkunku out"
                />

                <TimelineItem
                  minute="62'"
                  icon="⚽"
                  title="Goal - Chelsea"
                  player="Palmer"
                />

                <TimelineItem
                  minute="45+2'"
                  icon="🟨"
                  title="Yellow Card - Arsenal"
                  player="Ødegaard"
                />

                <TimelineItem
                  minute="HT"
                  icon="⏱"
                  title="Half Time"
                  player="2 - 1"
                />

              </div>
            </div>

            <div className="white-panel">

              <div className="panel-title">
                <h3>Match Statistics</h3>
              </div>

              <StatBar
                label="Possession"
                home="58%"
                away="42%"
              />

              <StatBar
                label="Shots on Target"
                home="7"
                away="4"
              />

              <StatBar
                label="Total Shots"
                home="14"
                away="9"
              />

              <StatBar
                label="Corners"
                home="6"
                away="3"
              />

              <StatBar
                label="Fouls"
                home="8"
                away="11"
              />

            </div>

          </div>

          <div className="join-room-banner">

            <div className="join-room-icon">
              <MessageCircle size={24} />
            </div>

            <div>
              <strong>Join the Fan Room</strong>

              <p>
                Discuss the match, react to goals and earn rewards.
              </p>
            </div>

            <a href="/fan-hub">
              Join Now
            </a>

          </div>

        </div>

        <aside className="live-side">

          <div className="white-panel">

            <div className="panel-title">
              <h3>Fan Reactions</h3>
            </div>

            {fanMessages.map((message) => (
              <div
                className="fan-message"
                key={message.user}
              >

                <div className="sf-avatar small">
                  {message.avatar}
                </div>

                <div>
                  <div className="fan-message-head">
                    <strong>{message.user}</strong>
                    <span>{message.time}</span>
                  </div>

                  <p>{message.text}</p>
                </div>

              </div>
            ))}

          </div>

          <div className="white-panel top-fans">

            <div className="panel-title">
              <h3>Top Fans</h3>
            </div>

            {[
              "KingTee",
              "Esther",
              "BlueRanger",
              "General4Life",
            ].map((fan, index) => (

              <div className="top-fan" key={fan}>

                <div className="rank">
                  {index + 1}
                </div>

                <div className="sf-avatar small">
                  {fan[0]}
                </div>

                <div className="top-fan-info">
                  <strong>{fan}</strong>
                  <span>
                    {1200 - index * 180} pts
                  </span>
                </div>

                <Star
                  size={14}
                  fill="currentColor"
                />

              </div>

            ))}

          </div>

        </aside>

      </div>
    </div>
  );
}

function TimelineItem({
  minute,
  icon,
  title,
  player,
}: {
  minute: string;
  icon: string;
  title: string;
  player: string;
}) {
  return (
    <div className="timeline-item">

      <span className="timeline-minute">
        {minute}
      </span>

      <div className="timeline-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{player}</span>
      </div>

    </div>
  );
}

function StatBar({
  label,
  home,
  away,
}: {
  label: string;
  home: string;
  away: string;
}) {
  const numericHome = parseInt(
    home.replace("%", ""),
    10
  );

  const numericAway = parseInt(
    away.replace("%", ""),
    10
  );

  const total = numericHome + numericAway;

  const homeWidth = total
    ? (numericHome / total) * 100
    : 50;

  return (
    <div className="stat-bar">

      <div className="stat-values">
        <strong>{home}</strong>
        <span>{label}</span>
        <strong>{away}</strong>
      </div>

      <div className="stat-track">
        <span
          style={{
            width: `${homeWidth}%`,
          }}
        />
      </div>

    </div>
  );
}