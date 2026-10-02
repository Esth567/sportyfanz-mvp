import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Login() {
  return (
    <div className="form-wrap">

      <div className="card form-card">

        <div style={{ marginBottom: 18 }}>
          <Logo small />
        </div>

        <h1>
          Welcome back
        </h1>

        <p>
          Log in to continue your
          SportyFanz experience.
        </p>

        <form className="form">

          <div className="field">

            <label>
              Email address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
            />

          </div>

          <div className="field">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
            />

          </div>

          <button
            className="primary-btn"
            type="submit"
          >
            Log in
          </button>

        </form>

        <div className="form-note">
          New to SportyFanz?{" "}
          <Link href="/register">
            Create an account
          </Link>
        </div>

      </div>

    </div>
  );
}