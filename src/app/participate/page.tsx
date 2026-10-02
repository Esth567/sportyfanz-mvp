"use client";

import { ChevronDown, Sparkles } from "lucide-react";

export default function ParticipatePage() {
  return (
    <div className="page">

      <div className="page-header">
        <div>
          <span>PLAY • PREDICT • EARN</span>

          <h1>Participate</h1>

          <p>
            Put your sports knowledge to work and earn
            Sporty Points.
          </p>
        </div>
      </div>

      <div className="participate-grid">

        <div className="white-panel prediction-card">

          <div className="participate-tabs">
            <span className="active">Predictions</span>
            <span>Polls</span>
            <span>Trivia</span>
            <span>Challenges</span>
          </div>

          <div className="question-block">

            <span className="question-label">
              MATCH PREDICTION
            </span>

            <h2>
              Who will win in this match?
            </h2>

            {[
              "Arsenal",
              "Draw",
              "Chelsea",
            ].map((answer) => (

              <label
                className="radio-option"
                key={answer}
              >
                <input
                  type="radio"
                  name="winner"
                />

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

            <span className="question-label">
              PLAYER PREDICTION
            </span>

            <h2>
              Player to score next
            </h2>

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

            <span className="question-label">
              QUICK TRIVIA
            </span>

            <h2>
              How many shots on target has Arsenal had?
            </h2>

            <div className="trivia-options">
              {["4", "6", "8", "10"].map(
                (number) => (
                  <button key={number}>
                    {number}
                  </button>
                )
              )}
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

            <h3>
              Earn while you watch.
            </h3>

            <p>
              Every prediction, poll and challenge
              brings you closer to your next reward.
            </p>

          </div>

          <div className="white-panel">

            <div className="panel-title">
              <h3>Your Progress</h3>
            </div>

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