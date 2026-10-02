import { Shield } from "lucide-react";

export default function MyKingdomPage() {
  return (
    <div className="page">

      <div className="page-header">
        <div>
          <span>YOUR PROFILE</span>

          <h1>My Kingdom</h1>

          <p>
            Your fan identity, stats, achievements and
            sports world.
          </p>
        </div>
      </div>

      <div className="kingdom-layout">

        <div className="kingdom-profile">

          <div className="kingdom-cover" />

          <div className="kingdom-profile-body">

            <div className="kingdom-avatar">
              E
            </div>

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

            <div className="panel-title">
              <h3>My Sports</h3>
              <button>Manage</button>
            </div>

            <div className="sports-grid">

              {[
                ["Football", "⚽"],
                ["Basketball", "🏀"],
                ["Tennis", "🎾"],
                ["Boxing", "🥊"],
              ].map(([sport, icon]) => (

                <div
                  className="my-sport"
                  key={sport}
                >
                  <div>{icon}</div>

                  <strong>{sport}</strong>

                  <span>Fan</span>
                </div>

              ))}

            </div>

          </div>

          <div className="white-panel">

            <div className="panel-title">
              <h3>Achievements</h3>
              <button>View All</button>
            </div>

            <div className="achievement-grid">

              {[
                ["🏆", "Match Master"],
                ["🔥", "7 Day Streak"],
                ["🎯", "Prediction Pro"],
                ["👑", "Fan Champion"],
              ].map(([icon, title]) => (

                <div
                  className="achievement"
                  key={title}
                >
                  <div>{icon}</div>
                  <strong>{title}</strong>
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}