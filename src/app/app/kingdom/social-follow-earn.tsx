"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Gift,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

type SocialTask = {
  id: string;
  taskKey: string;
  name: string;
  handle: string;
  url: string;
  description: string;
  points: number;
  completed: boolean;
};

export default function SocialFollowEarn() {
  const [tasks, setTasks] = useState<SocialTask[]>([]);
  const [progressionPoints, setProgressionPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTasks() {
      try {
        const response = await fetch("/api/progression/social", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load social tasks.");
        }

        if (active) {
          setTasks(data.tasks ?? []);
          setProgressionPoints(data.progressionPoints ?? 0);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load social tasks."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTasks();

    return () => {
      active = false;
    };
  }, []);

  async function claimTask(task: SocialTask) {
    setClaiming(task.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/progression/social", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: task.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to claim points.");
      }

      setTasks((current) =>
        current.map((item) =>
          item.id === task.id
            ? { ...item, completed: true }
            : item
        )
      );

      setProgressionPoints(data.progressionPoints ?? progressionPoints);

      setMessage(
        data.alreadyCompleted
          ? `${task.name} has already been claimed.`
          : `Success! You earned ${data.pointsAwarded} progression points from ${task.name}.`
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to claim points."
      );
    } finally {
      setClaiming(null);
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <section className="white-panel social-earn-panel">
      <div className="social-earn-heading">
        <div>
          <span className="social-earn-eyebrow">
            FOLLOW • CONNECT • EARN
          </span>
          <h3>Follow SportyFanz & Earn</h3>
          <p>
            Connect with SportyFanz on social media and earn
            progression points for each platform.
          </p>
        </div>

        <div className="social-earn-total">
          <Gift size={19} />
          <strong>+10</strong>
          <span>POINTS EACH</span>
        </div>
      </div>

      <div className="social-earn-progress">
        <div>
          <span>Tasks completed</span>
          <strong>
            {completedCount} / {tasks.length}
          </strong>
        </div>

        <div className="social-earn-progress-track">
          <span
            style={{
              width: `${
                tasks.length
                  ? (completedCount / tasks.length) * 100
                  : 0
              }%`,
            }}
          />
        </div>

        <div className="social-earn-balance">
          <span>Your progression points</span>
          <strong>{progressionPoints.toLocaleString()}</strong>
        </div>
      </div>

      {loading ? (
        <div className="social-earn-loading">
          <LoaderCircle size={18} className="social-spin" />
          Loading social tasks...
        </div>
      ) : error && tasks.length === 0 ? (
        <p className="social-earn-error">{error}</p>
      ) : (
        <div className="social-task-grid">
          {tasks.map((task) => (
            <div className="social-task-card" key={task.id}>
              <div className="social-task-top">
                <div className={`social-platform-icon social-${task.id}`}>
                  {task.name === "Facebook"
                    ? "f"
                    : task.name === "Instagram"
                      ? "◎"
                      : task.name === "TikTok"
                        ? "♪"
                        : task.name === "YouTube"
                          ? "▶"
                          : "𝕏"}
                </div>

                <div className="social-task-identity">
                  <strong>{task.name}</strong>
                  <span>{task.handle}</span>
                </div>

                <span className="social-task-points">
                  +{task.points}
                </span>
              </div>

              <p>{task.description}</p>

              <div className="social-task-actions">
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-visit-button"
                >
                  Visit account
                  <ExternalLink size={13} />
                </a>

                {task.completed ? (
                  <span className="social-completed">
                    <CheckCircle2 size={15} />
                    Completed
                  </span>
                ) : (
                  <button
                    type="button"
                    className="social-claim-button"
                    disabled={claiming !== null}
                    onClick={() => claimTask(task)}
                  >
                    {claiming === task.id ? (
                      <>
                        <LoaderCircle
                          size={14}
                          className="social-spin"
                        />
                        Claiming...
                      </>
                    ) : (
                      "I followed — claim"
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {message && (
        <p className="social-earn-success">
          <CheckCircle2 size={15} />
          {message}
        </p>
      )}

      {error && tasks.length > 0 && (
        <p className="social-earn-error">{error}</p>
      )}

      <div className="social-earn-notice">
        <ShieldCheck size={16} />
        <span>
          Points are awarded once per platform per account.
          By claiming, you confirm that you have followed or
          subscribed to the account. Claims are not independently
          verified by the social platforms.
        </span>
      </div>
    </section>
  );
}
