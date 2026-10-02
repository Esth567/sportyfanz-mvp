import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Crown,
  Plus,
  Target,
} from "lucide-react";

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

export default function HomePage() {
  return (
    <div className="page">

      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <span>WELCOME BACK, ESTHER</span>

          <h1>Your Fan Kingdom</h1>

          <p>
            Everything happening in your sports world,
            all in one place.
          </p>
        </div>

        <div className="header-actions">
          <button className="secondary-button">
            <CalendarDays size={15} />
            Today
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* HOME GRID */}
      <section className="home-grid">

        {/* HERO */}
        <div
          className="hero-card"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1400&q=85)",
          }}
        >
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
              Watch, participate, connect and earn rewards
              for being the fan you already are.
            </p>

            <Link
              href="/live"
              className="primary-button"
            >
              Explore Live Matches
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>

        {/* FAN KINGDOM */}
        <div className="fan-kingdom-card">

          <div className="kingdom-card-header">

            <div className="sf-avatar large">
              E
            </div>

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

          <Link
            href="/kingdom"
            className="primary-button"
          >
            View My Kingdom
          </Link>

        </div>

        {/* LIVE MATCHES */}
        <div className="section-block live-block">

          <div className="section-title">
            <h2>Live Now</h2>

            <Link href="/live">
              View All
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="match-card-grid">

            {matches.map((match) => (
              <div
                className="match-card"
                key={match.home}
              >

                <div
                  className="match-card-image"
                  style={{
                    backgroundImage:
                      `url(${match.image})`,
                  }}
                >
                  <span className="live-pill">
                    <span />
                    LIVE
                  </span>

                  <span className="match-card-time">
                    {match.time}
                  </span>
                </div>

                <div className="match-card-body">

                  <div className="match-card-teams">
                    <strong>{match.home}</strong>

                    <span>{match.score}</span>

                    <strong>{match.away}</strong>
                  </div>

                  <div className="match-card-footer">

                    <small>{match.league}</small>

                    <Link href="/live">
                      Watch
                    </Link>

                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="home-right-column">

          {/* CHALLENGE */}
          <div className="challenge-card">

            <div className="challenge-icon">
              <Target size={21} />
            </div>

            <div>
              <span>Fan Challenge</span>

              <strong>
                Predict the next goal scorer
              </strong>

              <small>
                Win up to +100 pts
              </small>
            </div>

            <Link href="/participate">
              Join
            </Link>

          </div>

          {/* TRENDING ROOMS */}
          <div className="white-panel trending-rooms">

            <div className="panel-title">
              <h3>Trending in Fan Rooms</h3>

              <Link href="/fanroom">
                View All
                <ChevronRight size={13} />
              </Link>
            </div>

            {[
              ["Arsenal Fans", "5.2K fans", "🔥"],
              ["Football Fans", "3.8K fans", "⚽"],
              ["Premier League", "2.9K fans", "🏆"],
            ].map((room) => (

              <Link
                href="/fanroom"
                className="room-row"
                key={room[0]}
              >
                <div className="room-icon">
                  {room[2]}
                </div>

                <div>
                  <strong>{room[0]}</strong>
                  <span>{room[1]}</span>
                </div>

                <ChevronRight size={15} />
              </Link>

            ))}

          </div>
        </div>

        {/* UPCOMING */}
        <div className="section-block upcoming-block">

          <div className="section-title">
            <h2>Upcoming Matches</h2>

            <button>
              View Calendar
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="upcoming-list">

            {[
              ["Man City", "Tottenham", "Today • 8:00 PM"],
              ["Barcelona", "Real Madrid", "Today • 10:00 PM"],
              ["Nigeria", "Ghana", "Tomorrow • 7:00 PM"],
              ["Djokovic", "Alcaraz", "Tomorrow • 9:00 PM"],
            ].map((game, index) => (

              <div
                className="upcoming-card"
                key={index}
              >

                <div className="team-badge">
                  {index === 0
                    ? "MC"
                    : index === 1
                    ? "FCB"
                    : "⚽"}
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

        {/* FAN ROOM PROMO */}
        <div className="promo-card">

          <div className="promo-image">
            <span>FAN</span>
          </div>

          <div className="promo-content">

            <span>FAN ROOM</span>

            <h3>
              Join the conversation.
            </h3>

            <p>
              Discuss matches, predictions and rewards
              with fans.
            </p>

            <Link href="/fanroom">
              Enter Fan Room
              <ArrowRight size={14} />
            </Link>

          </div>
        </div>

      </section>
    </div>
  );
}