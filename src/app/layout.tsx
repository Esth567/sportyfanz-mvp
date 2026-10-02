import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../styles/globals.css";
import AppShell from "../components/AppShell";

export const metadata: Metadata = {
  title: "SportyFanz",
  description:
    "Every Sport. Every Fan. Every Moment.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}