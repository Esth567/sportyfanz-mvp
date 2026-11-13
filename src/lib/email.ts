import nodemailer from "nodemailer";
import { appendFile } from "node:fs/promises";

const TEST_DATABASE_HOST =
  "ep-shy-sea-b4w05y79-pooler.c-6.us-east-2.aws.neon.tech";

function isEmailTestMode(): boolean {
  if (process.env.SPORTYFANZ_EMAIL_TEST_MODE !== "1") {
    return false;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (
    process.env.NODE_ENV === "production" ||
    !databaseUrl ||
    new URL(databaseUrl).hostname !== TEST_DATABASE_HOST
  ) {
    throw new Error("Email test mode is not permitted.");
  }

  return true;
}


function getEmailTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!host || !user || !password) {
    throw new Error("SMTP configuration is incomplete.");
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Invalid SMTP port.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass: password,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
}

export async function sendVerificationEmail(
  email: string,
  code: string
) {
  if (isEmailTestMode()) {
    const message = {
      to: email,
      code,
      capturedAt: new Date().toISOString(),
    };

    await appendFile(
      "/tmp/sportyfanz-test-verification-emails.jsonl",
      JSON.stringify(message) + "\\n",
      { mode: 0o600 }
    );

    return;
  }

  const transport = getEmailTransport();

  await transport.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: "Verify your SportyFanz email address",
    text: [
      "Welcome to SportyFanz!",
      "",
      `Your email verification code is: ${code}`,
      "",
      "This code expires in 10 minutes.",
      "If you did not create this account, ignore this email.",
      "",
      "SportyFanz",
      "Every Sport. Every Fan. Every Moment.",
    ].join("\n"),
  });
}
