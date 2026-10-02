import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "sportyfanz.db");

const globalForDb = globalThis as unknown as {
  db: Database.Database | undefined;
};

export const db =
  globalForDb.db ??
  new Database(dbPath);

db.pragma("foreign_keys = ON");

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}