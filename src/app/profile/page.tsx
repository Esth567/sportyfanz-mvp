import { SectionHeader } from "@/components/UI";

export default function Profile() {
  return (
    <>
      <section className="card">

        <div className="profile-head">

          <div className="big-avatar">
            EB
          </div>

          <div className="profile-meta">

            <h1>
              FootballFan23
            </h1>

            <p>
              Fan Level: Legend · Lagos, Nigeria
            </p>

            <p style={{ marginTop: 8 }}>
              1,250 points · 12 badges ·
              28 following · 64 followers
            </p>

          </div>

        </div>

        <div style={{ marginTop: 18 }}>

          <div className="stat-label">

            <span>Progress</span>

            <b>68%</b>

            <span>Next level</span>

          </div>

          <div className="progress">
            <i />
          </div>

        </div>

      </section>

      <div
        className="two-col"
        style={{ marginTop: 14 }}
      >

        <section className="card">

          <SectionHeader
            title="My Favourite Club"
          />

          <div className="list">

            <div className="list-item">
              <b>Liverpool</b>
              <span>Following</span>
            </div>

            <div className="list-item">
              <b>Prediction Record</b>
              <span>68%</span>
            </div>

            <div className="list-item">
              <b>My Achievements</b>
              <span>12 badges</span>
            </div>

          </div>

        </section>

        <section className="card">

          <SectionHeader
            title="My Activity"
          />

          <div className="list">

            {[
              "Correct prediction",
              "Joined Liverpool Fans",
              "Posted in Fan Hub",
              "Earned 50 points"
            ].map((activity) => (

              <div
                className="list-item"
                key={activity}
              >

                <b>{activity}</b>

                <span>
                  Today
                </span>

              </div>

            ))}

          </div>

        </section>

      </div>
    </>
  );
}