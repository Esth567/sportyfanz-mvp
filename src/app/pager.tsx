"use client";

import React, { useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  Bookmark,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Crown,
  Gift,
  Globe2,
  Heart,
  Home,
  LayoutGrid,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Wallet,
  X,
  Zap,
  Plus,
  UserRound,
  Swords,
  BarChart3,
  Radio,
  Award,
  Ticket,
  History,
  Package,
  Dumbbell,
} from "lucide-react";

import "./globals.css";

type Page =
  | "home"
  | "live"
  | "fanroom"
  | "participate"
  | "discover"
  | "kingdom"
  | "rewards"
  | "onboarding";

const navItems: {
  id: Page;
  label: string;
  icon: React.ElementType;
}[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "live", label: "Live & Matches", icon: Radio },
  { id: "participate", label: "Participate", icon: Target },
  { id: "discover", label: "Discover", icon: Search },
  { id: "kingdom", label: "My Kingdom", icon: Crown },
  { id: "fanroom", label: "Fan Rooms", icon: MessageCircle },
  { id: "rewards", label: "Rewards", icon: Gift },
];

const matches = [
  {
    home: "Arsenal",
    away: "Chelsea",
    score: "2 - 1",
    time: "72'",
    league: "Premier League",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80",
  },
  {
    home: "Lakers",
    away: "Warriors",
    score: "68 - 72",
    time: "Q3",
    league: "NBA",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80",
  },
  {
    home: "Man Utd",
    away: "Liverpool",
    score: "1 - 1",
    time: "61'",
    league: "Premier League",
    image:
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=900&q=80",
  },
];

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
  {
    user: "MikelFan",
    text: "Arsenal all the way! ❤️",
    time: "7:20 PM",
    avatar: "M",
  },
];

export default function SportyFanzDesktop() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState(false);

  const renderPage = () => {
    switch (page) {
      case "live":
        return <LivePage onNavigate={setPage} />;

      case "fanroom":
        return <FanRoomPage />;

      case "participate":
        return <ParticipatePage />;

      case "discover":
        return <DiscoverPage />;

      case "kingdom":
        return <KingdomPage />;

      case "rewards":
        return <RewardsPage />;

      case "onboarding":
        return <OnboardingPage />;

      default:
        return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <main className="sf-app">
      <aside className="sf-sidebar">
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

        <nav className="sf-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;

            return (
              <button
                key={item.id}
                className={`sf-nav-item ${active ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sf-sidebar-section">
          <div className="sf-sidebar-label">COMMUNITY</div>

          <button
            className={`sf-nav-item ${
              page === "onboarding" ? "active" : ""
            }`}
            onClick={() => setPage("onboarding")}
          >
            <Users size={17} />
            <span>Join SportyFanz</span>
          </button>

          <button className="sf-nav-item">
            <Award size={17} />
            <span>Challenges</span>
          </button>

          <button className="sf-nav-item">
            <Trophy size={17} />
            <span>Leaderboards</span>
          </button>
        </div>

        <div className="sf-sidebar-bottom">
          <button className="sf-nav-item">
            <Settings size={17} />
            <span>Settings</span>
          </button>

          <div className="sf-user-mini">
            <div className="sf-avatar">E</div>

            <div className="sf-user-info">
              <strong>Esther</strong>
              <span>Champion Fan</span>
            </div>

            <MoreHorizontal size={18} />
          </div>
        </div>
      </aside>

      <section className="sf-main">
        <header className="sf-topbar">
          <div className="sf-search">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams, players, events..."
            />
            <span className="sf-search-shortcut">⌘ K</span>
          </div>

          <div className="sf-top-actions">
            <button
              className="sf-icon-button notification-button"
              onClick={() => setNotifications(!notifications)}
            >
              <Bell size={18} />

              <span className="notification-dot" />

              {notifications && (
                <div className="notification-dropdown">
                  <div className="notification-title">
                    Notifications
                  </div>

                  <div className="notification-row">
                    <div className="notification-icon">
                      <Gift size={15} />
                    </div>
                    <div>
                      <strong>Reward unlocked</strong>
                      <p>You earned 250 Sporty Points.</p>
                    </div>
                  </div>

                  <div className="notification-row">
                    <div className="notification-icon">
                      <Radio size={15} />
                    </div>
                    <div>
                      <strong>Match is live</strong>
                      <p>Arsenal vs Chelsea is underway.</p>
                    </div>
                  </div>
                </div>
              )}
            </button>

            <button
              className="sf-profile"
              onClick={() => setPage("kingdom")}
            >
              <div className="sf-avatar">E</div>

              <div>
                <strong>Esther</strong>
                <span>Champion Fan</span>
              </div>

              <ChevronDown size={15} />
            </button>
          </div>
        </header>

        <div className="sf-content">
          {renderPage()}
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   HOME
========================================================= */

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="WELCOME BACK, ESTHER"
        title="Your Fan Kingdom"
        description="Everything happening in your sports world, all in one place."
      />

      <section className="home-grid">
        <div className="hero-card">
          <div className="hero-overlay" />

          <div className="hero-content">
            <span className="live-pill">
              <span />
              LIVE NOW
            </span>

            <h1>
              Real Fans.
              <br />
              Real Sports.
              <br />
              <span>Real Rewards.</span>
            </h1>

            <p>
              Watch, participate, connect and earn rewards for being
              the fan you already are.
            </p>

            <button
              className="primary-button"
              onClick={() => onNavigate("live")}
            >
              Explore Live Matches
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <FanKingdomCard onClick={() => onNavigate("kingdom")} />

        <div className="section-block live-block">
          <SectionTitle
            title="Live Now"
            action="View All"
            onAction={() => onNavigate("live")}
          />

          <div className="match-card-grid">
            {matches.map((match, index) => (
              <MatchCard
                key={match.home}
                match={match}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="home-right-column">
          <FanChallengesCard />

          <TrendingRoomsCard />
        </div>

        <div className="section-block upcoming-block">
          <SectionTitle title="Upcoming Matches" action="View Calendar" />

          <div className="upcoming-list">
            {[
              ["Man City", "Tottenham", "Today • 8:00 PM"],
              ["Barcelona", "Real Madrid", "Today • 10:00 PM"],
              ["Nigeria", "Ghana", "Tomorrow • 7:00 PM"],
              ["Djokovic", "Alcaraz", "Tomorrow • 9:00 PM"],
            ].map((game, index) => (
              <div className="upcoming-card" key={index}>
                <div className="team-badge">
                  {index === 0 ? "MC" : index === 1 ? "FCB" : "⚽"}
                </div>

                <div>
                  <strong>
                    {game[0]} <span>vs</span> {game[1]}
                  </strong>
                  <small>{game[2]}</small>
                </div>

                <ChevronRight size={16} />
              </div>
            ))}
          </div>
        </div>

        <div className="promo-card">
          <div className="promo-image">
            <span>FAN</span>
          </div>

          <div className="promo-content">
            <span>FAN ROOM</span>
            <h3>Join the conversation.</h3>
            <p>Discuss matches, predictions and rewards with fans.</p>
            <button onClick={() => onNavigate("fanroom")}>
              Enter Fan Room <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   LIVE PAGE
========================================================= */

function LivePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="page">
      <PageHeader
        eyebrow="MATCH CENTRE"
        title="Live & Matches"
        description="Follow every moment, every stat and every fan reaction."
      />

      <div className="match-centre-layout">
        <div>
          <div className="big-match-card">
            <div className="match-top">
              <div>
                <span className="live-pill">
                  <span />
                  LIVE
                </span>
                <span className="match-time">72:34</span>
              </div>

              <span className="league-name">
                Premier League
              </span>
            </div>

            <div className="score-area">
              <div className="large-team">
                <div className="large-team-logo arsenal">A</div>
                <strong>Arsenal</strong>
                <span>Home</span>
              </div>

              <div className="score">
                <strong>2 - 1</strong>
                <span>Emirates Stadium</span>
              </div>

              <div className="large-team">
                <div className="large-team-logo chelsea">C</div>
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
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="match-lower-grid">
            <div className="white-panel">
              <PanelTitle title="Match Timeline" />

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
              <PanelTitle title="Match Statistics" />

              <StatBar label="Possession" home="58%" away="42%" />

              <StatBar label="Shots on Target" home="7" away="4" />

              <StatBar label="Total Shots" home="14" away="9" />

              <StatBar label="Corners" home="6" away="3" />

              <StatBar label="Fouls" home="8" away="11" />
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

            <button onClick={() => onNavigate("fanroom")}>
              Join Now
            </button>
          </div>
        </div>

        <aside className="live-side">
          <div className="white-panel">
            <PanelTitle title="Fan Reactions" action="View All" />

            {fanMessages.slice(0, 4).map((message) => (
              <FanMessage key={message.user} message={message} />
            ))}
          </div>

          <div className="white-panel top-fans">
            <PanelTitle title="Top Fans" action="View All" />

            {["KingTee", "Esther", "BlueRanger", "General4Life"].map(
              (fan, index) => (
                <div className="top-fan" key={fan}>
                  <div className="rank">{index + 1}</div>
                  <div className="sf-avatar small">
                    {fan[0]}
                  </div>
                  <div className="top-fan-info">
                    <strong>{fan}</strong>
                    <span>{1200 - index * 180} pts</span>
                  </div>
                  <Star size={14} fill="currentColor" />
                </div>
              )
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   FAN ROOM
========================================================= */

function FanRoomPage() {
  const [message, setMessage] = useState("");
  const [roomTab, setRoomTab] = useState("Chat");

  return (
    <div className="page">
      <PageHeader
        eyebrow="COMMUNITY"
        title="Fan Room"
        description="Your space to react, discuss and connect with fellow fans."
      />

      <div className="fan-room-layout">
        <div className="fan-chat-card">
          <div className="fan-room-header">
            <div className="room-title">
              <div className="room-team-icons">
                <span className="arsenal">A</span>
                <span className="chelsea">C</span>
              </div>

              <div>
                <strong>Arsenal vs Chelsea</strong>
                <span>12.4K Fans • Live Discussion</span>
              </div>
            </div>

            <div className="room-actions">
              <button>
                <Bell size={17} />
              </button>
              <button>
                <Users size={17} />
              </button>
              <button>
                <MoreHorizontal size={17} />
              </button>
            </div>
          </div>

          <div className="room-tabs">
            {["Chat", "Polls", "Challenges"].map((tab) => (
              <button
                className={roomTab === tab ? "active" : ""}
                onClick={() => setRoomTab(tab)}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="chat-body">
            {fanMessages.map((msg) => (
              <div className="chat-message" key={msg.user}>
                <div className="sf-avatar">{msg.avatar}</div>

                <div className="chat-message-content">
                  <div>
                    <strong>{msg.user}</strong>
                    <span>{msg.time}</span>
                  </div>

                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            <div className="chat-poll">
              <div className="poll-heading">
                <strong>Who will score the next goal?</strong>
                <span>65% voted</span>
              </div>

              <div className="poll-option">
                <span>Arsenal</span>
                <strong>65%</strong>
              </div>

              <div className="poll-progress">
                <span style={{ width: "65%" }} />
              </div>

              <div className="poll-option">
                <span>Chelsea</span>
                <strong>25%</strong>
              </div>

              <div className="poll-progress">
                <span style={{ width: "25%" }} />
              </div>

              <div className="poll-option">
                <span>More Goals</span>
                <strong>10%</strong>
              </div>

              <div className="poll-progress">
                <span style={{ width: "10%" }} />
              </div>

              <button>Vote</button>
            </div>
          </div>

          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />

            <button>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <aside>
          <div className="white-panel">
            <PanelTitle title="Top Fans" action="View All" />

            {["KingTee", "Esther", "BlueRanger", "FootballQueen"].map(
              (name, index) => (
                <div className="top-fan" key={name}>
                  <div className="rank">{index + 1}</div>
                  <div className="sf-avatar small">{name[0]}</div>

                  <div className="top-fan-info">
                    <strong>{name}</strong>
                    <span>{1300 - index * 130} pts</span>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="room-reward-card">
            <Gift size={28} />
            <span>Fan Room Reward</span>
            <strong>Earn +50 pts</strong>
            <p>Participate in this room to increase your Fan Score.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   PARTICIPATE
========================================================= */

function ParticipatePage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="PLAY • PREDICT • EARN"
        title="Participate"
        description="Put your sports knowledge to work and earn Sporty Points."
      />

      <div className="participate-grid">
        <div className="white-panel prediction-card">
          <div className="participate-tabs">
            <span className="active">Predictions</span>
            <span>Polls</span>
            <span>Trivia</span>
            <span>Challenges</span>
          </div>

          <div className="question-block">
            <span className="question-label">MATCH PREDICTION</span>
            <h2>Who will win in this match?</h2>

            {["Arsenal", "Draw", "Chelsea"].map((answer) => (
              <label className="radio-option" key={answer}>
                <input type="radio" name="winner" />
                <span className="fake-radio" />
                <strong>{answer}</strong>
              </label>
            ))}

            <button className="green-button">
              Submit
              <span>+50 pts</span>
            </button>
          </div>

          <div className="question-block">
            <span className="question-label">PLAYER PREDICTION</span>
            <h2>Player to score next</h2>

            <button className="select-button">
              Select player
              <ChevronDown size={16} />
            </button>

            <button className="green-button">
              Submit
              <span>+25 pts</span>
            </button>
          </div>

          <div className="question-block">
            <span className="question-label">QUICK TRIVIA</span>
            <h2>How many shots on target has Arsenal had?</h2>

            <div className="trivia-options">
              {["4", "6", "8", "10"].map((number) => (
                <button key={number}>{number}</button>
              ))}
            </div>

            <button className="green-button">
              Submit
              <span>+20 pts</span>
            </button>
          </div>
        </div>

        <aside className="participate-side">
          <div className="participate-banner">
            <Sparkles size={27} />
            <h3>Earn while you watch.</h3>
            <p>
              Every prediction, poll and challenge brings you closer
              to your next reward.
            </p>
          </div>

          <div className="white-panel">
            <PanelTitle title="Your Progress" />

            <div className="progress-stat">
              <span>Daily Participation</span>
              <strong>7 / 10</strong>
            </div>

            <div className="progress-track">
              <span style={{ width: "70%" }} />
            </div>

            <div className="progress-stat">
              <span>Weekly Streak</span>
              <strong>5 days</strong>
            </div>

            <div className="progress-track">
              <span style={{ width: "82%" }} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   DISCOVER
========================================================= */

function DiscoverPage() {
  const [active, setActive] = useState("Sports");

  return (
    <div className="page">
      <PageHeader
        eyebrow="DISCOVER"
        title="Find Your Sports World"
        description="Explore teams, players, competitions and trending communities."
      />

      <div className="discover-search">
        <Search size={20} />
        <input placeholder="Search teams, players, events..." />
      </div>

      <div className="discover-tabs">
        {["Sports", "Teams", "Players", "Competitions"].map((tab) => (
          <button
            key={tab}
            className={active === tab ? "active" : ""}
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
              <div className="sport-discover-card" key={name}>
                <div>{icon}</div>
                <strong>{name}</strong>
                <span>Explore</span>
              </div>
            ))}
          </div>

          <div className="white-panel discover-list">
            <PanelTitle title="Popular Teams" action="View All" />

            {[
              ["Arsenal", "Premier League", "A"],
              ["Manchester United", "Premier League", "M"],
              ["Chelsea", "Premier League", "C"],
              ["Lakers", "NBA", "L"],
            ].map((team) => (
              <div className="discover-team" key={team[0]}>
                <div className="team-logo">{team[2]}</div>

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
            <PanelTitle title="Your Interests" />

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
            <button>Explore Fan Rooms</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* =========================================================
   KINGDOM
========================================================= */

function KingdomPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="YOUR PROFILE"
        title="My Kingdom"
        description="Your fan identity, stats, achievements and sports world."
      />

      <div className="kingdom-layout">
        <div className="kingdom-profile">
          <div className="kingdom-cover" />

          <div className="kingdom-profile-body">
            <div className="kingdom-avatar">E</div>

            <div className="kingdom-name">
              <h2>Esther</h2>
              <span>
                <Shield size={14} />
                Champion Fan
              </span>
            </div>

            <button className="outline-button">
              Edit Profile
            </button>
          </div>

          <div className="kingdom-stats">
            <div>
              <span>Fan Score</span>
              <strong>12,840</strong>
            </div>

            <div>
              <span>Sports IQ</span>
              <strong>87</strong>
            </div>

            <div>
              <span>Fan Pass</span>
              <strong>Gold</strong>
            </div>

            <div>
              <span>Fan Level</span>
              <strong>24</strong>
            </div>
          </div>
        </div>

        <div className="kingdom-main-grid">
          <div className="white-panel">
            <PanelTitle title="My Sports" action="Manage" />

            <div className="sports-grid">
              {["Football", "Basketball", "Tennis", "Boxing"].map(
                (sport) => (
                  <div className="my-sport" key={sport}>
                    <div>{sport === "Football" ? "⚽" : sport === "Basketball" ? "🏀" : sport === "Tennis" ? "🎾" : "🥊"}</div>
                    <strong>{sport}</strong>
                    <span>Fan</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="white-panel">
            <PanelTitle title="Achievements" action="View All" />

            <div className="achievement-grid">
              {[
                ["🏆", "Match Master"],
                ["🔥", "7 Day Streak"],
                ["🎯", "Prediction Pro"],
                ["👑", "Fan Champion"],
              ].map((item) => (
                <div className="achievement" key={item[1]}>
                  <div>{item[0]}</div>
                  <strong>{item[1]}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REWARDS
========================================================= */

function RewardsPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="FAN REWARDS"
        title="Your Rewards"
        description="Your loyalty has value. Redeem what you've earned."
      />

      <div className="rewards-balance">
        <div>
          <span>AVAILABLE SPORTY POINTS</span>
          <strong>12,840</strong>
          <small>+420 this week</small>
        </div>

        <div className="balance-icon">
          <CircleDollarSign size={35} />
        </div>
      </div>

      <div className="rewards-tabs">
        <button className="active">Available</button>
        <button>My Rewards</button>
        <button>History</button>
      </div>

      <div className="reward-grid">
        {[
          {
            icon: Ticket,
            title: "Match Ticket",
            desc: "Arsenal vs Chelsea",
            points: "5,000 pts",
          },
          {
            icon: Package,
            title: "Data Bundle",
            desc: "1GB • MTN",
            points: "2,000 pts",
          },
          {
            icon: ShoppingBag,
            title: "Merchandise",
            desc: "SportyFanz Jersey",
            points: "6,000 pts",
          },
          {
            icon: Gift,
            title: "Food Voucher",
            desc: "Football & Grill",
            points: "3,000 pts",
          },
          {
            icon: Radio,
            title: "Viewing Centre",
            desc: "10% Off",
            points: "1,500 pts",
          },
        ].map((reward) => {
          const Icon = reward.icon;

          return (
            <div className="reward-card" key={reward.title}>
              <div className="reward-image">
                <Icon size={30} />
              </div>

              <div className="reward-info">
                <span>{reward.title}</span>
                <strong>{reward.desc}</strong>
                <small>{reward.points}</small>
              </div>

              <button>Redeem</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   ONBOARDING
========================================================= */

function OnboardingPage() {
  return (
    <div className="onboarding-page">
      <div className="onboarding-left">
        <div className="onboarding-brand">
          <Crown size={27} />
          <strong>SportyFanz</strong>
        </div>

        <span className="onboarding-small">
          Every Sport. Every Fan. Every Moment.
        </span>

        <h1>
          Your Passion.
          <br />
          Your Community.
          <br />
          <span>Your Rewards.</span>
        </h1>

        <p>
          Join the home of sports fans. Watch live matches, meet
          your community, participate in challenges and earn rewards
          for being a fan.
        </p>

        <div className="onboarding-buttons">
          <button className="primary-button">
            Create Account
            <ArrowRight size={16} />
          </button>

          <button className="outline-light">
            Log In
          </button>
        </div>

        <div className="onboarding-features">
          <div>
            <Check size={16} />
            Real fan communities
          </div>

          <div>
            <Check size={16} />
            Live sports experience
          </div>

          <div>
            <Check size={16} />
            Real rewards
          </div>
        </div>
      </div>

      <div className="onboarding-right">
        <div className="onboarding-image-card">
          <div className="onboarding-image-overlay" />

          <div className="onboarding-sports">
            <span>⚽</span>
            <span>🏀</span>
            <span>🎾</span>
            <span>🥊</span>
          </div>

          <div className="onboarding-image-text">
            <span>SPORTYFANZ</span>
            <h2>Where Fans Rule.</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-header">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="header-actions">
        <button className="secondary-button">
          <CalendarDays size={15} />
          Today
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-title">
      <h2>{title}</h2>

      {action && (
        <button onClick={onAction}>
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function PanelTitle({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <div className="panel-title">
      <h3>{title}</h3>

      {action && (
        <button>
          {action}
          <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}

function FanKingdomCard({ onClick }: { onClick: () => void }) {
  return (
    <div className="fan-kingdom-card">
      <div className="kingdom-card-header">
        <div className="sf-avatar large">E</div>

        <div>
          <span>Fan Kingdom</span>
          <strong>Esther</strong>
        </div>

        <ChevronDown size={16} />
      </div>

      <div className="kingdom-card-stats">
        <div>
          <span>Fan Score</span>
          <strong>12,840</strong>
        </div>

        <div>
          <span>Sports IQ</span>
          <strong>87</strong>
        </div>

        <div className="add-score">
          <Plus size={17} />
        </div>
      </div>

      <button onClick={onClick}>View My Kingdom</button>
    </div>
  );
}

function MatchCard({
  match,
  index,
}: {
  match: (typeof matches)[number];
  index: number;
}) {
  return (
    <div className="match-card">
      <div
        className="match-card-image"
        style={{
          backgroundImage: `url(${match.image})`,
        }}
      >
        <span className="live-pill">
          <span />
          LIVE
        </span>

        <span className="match-card-time">{match.time}</span>
      </div>

      <div className="match-card-body">
        <div className="match-card-teams">
          <strong>{match.home}</strong>
          <span>{match.score}</span>
          <strong>{match.away}</strong>
        </div>

        <div className="match-card-footer">
          <small>{match.league}</small>

          <button>Watch</button>
        </div>
      </div>
    </div>
  );
}

function FanChallengesCard() {
  return (
    <div className="challenge-card">
      <div className="challenge-icon">
        <Target size={21} />
      </div>

      <div>
        <span>Fan Challenge</span>
        <strong>Predict the next goal scorer</strong>
        <small>Win up to +100 pts</small>
      </div>

      <button>Join</button>
    </div>
  );
}

function TrendingRoomsCard() {
  return (
    <div className="white-panel trending-rooms">
      <PanelTitle title="Trending in Fan Rooms" action="View All" />

      {[
        ["Arsenal Fans", "5.2K fans", "🔥"],
        ["Football Fans", "3.8K fans", "⚽"],
        ["Premier League", "2.9K fans", "🏆"],
      ].map((room) => (
        <div className="room-row" key={room[0]}>
          <div className="room-icon">{room[2]}</div>

          <div>
            <strong>{room[0]}</strong>
            <span>{room[1]}</span>
          </div>

          <ChevronRight size={15} />
        </div>
      ))}
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
      <span className="timeline-minute">{minute}</span>
      <div className="timeline-icon">{icon}</div>

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
  const numericHome = parseInt(home.replace("%", ""));
  const numericAway = parseInt(away.replace("%", ""));

  const total = numericHome + numericAway;
  const homeWidth = total ? (numericHome / total) * 100 : 50;

  return (
    <div className="stat-bar">
      <div className="stat-values">
        <strong>{home}</strong>
        <span>{label}</span>
        <strong>{away}</strong>
      </div>

      <div className="stat-track">
        <span style={{ width: `${homeWidth}%` }} />
      </div>
    </div>
  );
}

function FanMessage({
  message,
}: {
  message: (typeof fanMessages)[number];
}) {
  return (
    <div className="fan-message">
      <div className="sf-avatar small">{message.avatar}</div>

      <div>
        <div className="fan-message-head">
          <strong>{message.user}</strong>
          <span>{message.time}</span>
        </div>

        <p>{message.text}</p>
      </div>
    </div>
  );
}