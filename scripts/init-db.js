const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dataDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const db = new Database(
  path.join(dataDir, "sportyfanz.db")
);

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    fan_points INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    logo TEXT,
    sport TEXT DEFAULT 'Football',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    team_id INTEGER,
    position TEXT,
    sport TEXT DEFAULT 'Football',
    FOREIGN KEY(team_id) REFERENCES teams(id)
  );

  CREATE TABLE IF NOT EXISTS stories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    category TEXT,
    image TEXT,
    featured INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    home_team TEXT NOT NULL,
    away_team TEXT NOT NULL,
    home_score INTEGER DEFAULT 0,
    away_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Upcoming',
    competition TEXT,
    match_time TEXT,
    sport TEXT DEFAULT 'Football',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS polls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS poll_options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    poll_id INTEGER NOT NULL,
    option_text TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    FOREIGN KEY(poll_id)
      REFERENCES polls(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS poll_votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    poll_id INTEGER NOT NULL,
    option_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    UNIQUE(poll_id, user_id),

    FOREIGN KEY(poll_id)
      REFERENCES polls(id)
      ON DELETE CASCADE,

    FOREIGN KEY(option_id)
      REFERENCES poll_options(id)
      ON DELETE CASCADE,

    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    match_id INTEGER NOT NULL,
    prediction TEXT NOT NULL,
    points_awarded INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, match_id),

    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

    FOREIGN KEY(match_id)
      REFERENCES matches(id)
      ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS fan_point_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    points INTEGER NOT NULL,
    reason TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
      REFERENCES users(id)
      ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_stories_created
  ON stories(created_at);

  CREATE INDEX IF NOT EXISTS idx_matches_time
  ON matches(match_time);

  CREATE INDEX IF NOT EXISTS idx_predictions_user
  ON predictions(user_id);
`);

const insertStory = db.prepare(`
  INSERT INTO stories
  (title, summary, category, featured)
  VALUES (?, ?, ?, ?)
`);

const storyCount = db
  .prepare("SELECT COUNT(*) AS count FROM stories")
  .get();

if (storyCount.count === 0) {
  insertStory.run(
    "Osimhen: Two Goals, One Big Statement",
    "A big performance puts the spotlight on the striker and what it means for his season.",
    "Football",
    1
  );

  insertStory.run(
    "The Biggest Matchday Talking Points",
    "What happened, what matters and what fans should watch next.",
    "Sports",
    0
  );

  insertStory.run(
    "Academy Football: The Next Generation",
    "Young athletes continue to make their mark at grassroots level.",
    "Academies",
    0
  );
}

const insertMatch = db.prepare(`
  INSERT INTO matches
  (
    home_team,
    away_team,
    home_score,
    away_score,
    status,
    competition,
    match_time
  )
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const matchCount = db
  .prepare("SELECT COUNT(*) AS count FROM matches")
  .get();

if (matchCount.count === 0) {
  insertMatch.run(
    "Arsenal",
    "Napoli",
    1,
    1,
    "Live",
    "European Competition",
    "Today • 8:00 PM"
  );

  insertMatch.run(
    "Liverpool",
    "Atlético Madrid",
    0,
    0,
    "Upcoming",
    "European Competition",
    "Tomorrow • 8:00 PM"
  );

  insertMatch.run(
    "Rivers United",
    "Enyimba",
    0,
    0,
    "Upcoming",
    "NPFL",
    "Saturday • 4:00 PM"
  );
}

const insertPoll = db.prepare(`
  INSERT INTO polls (question)
  VALUES (?)
`);

const pollCount = db
  .prepare("SELECT COUNT(*) AS count FROM polls")
  .get();

if (pollCount.count === 0) {
  const result = insertPoll.run(
    "Who scores next?"
  );

  const pollId = result.lastInsertRowid;

  const insertOption = db.prepare(`
    INSERT INTO poll_options
    (poll_id, option_text)
    VALUES (?, ?)
  `);

  insertOption.run(pollId, "Arsenal");
  insertOption.run(pollId, "Napoli");
  insertOption.run(pollId, "No Goal");
}

db.close();

console.log(
  "SportyFanz database initialized successfully."
);