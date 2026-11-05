"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/onboarding");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center">
      Redirecting to SportyFanz...
    </main>
  );
}
