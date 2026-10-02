import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function Register() {
  return (
    <div className="form-wrap">

      <div className="card form-card">

        <div style={{ marginBottom: 18 }}>
          <Logo small />
        </div>

        <h1>
          Create your fan profile
        </h1>

        <p>
          Join the community and start
          participating.
        </p>

        <form className="form">

          <div className="field">

            <label>
              Full name
            </label>

            <input
              placeholder="Your name"
            />

          </div>

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
            Create account
          </button>

        </form>

        <div className="form-note">
          Already have an account?{" "}
          <Link href="/login">
            Log in
          </Link>
        </div>

      </div>

    </div>
  );
}