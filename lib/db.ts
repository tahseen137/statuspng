import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'statuspng.db');
let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    db = new Database(dbPath);
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      org_name TEXT NOT NULL,
      org_slug TEXT UNIQUE NOT NULL,
      plan TEXT DEFAULT 'free',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS monitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      url TEXT NOT NULL,
      check_interval INTEGER DEFAULT 60,
      timeout INTEGER DEFAULT 30,
      status TEXT DEFAULT 'unknown',
      last_checked DATETIME,
      last_status_change DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS checks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      monitor_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      response_time INTEGER,
      status_code INTEGER,
      error_message TEXT,
      checked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (monitor_id) REFERENCES monitors(id)
    );

    CREATE TABLE IF NOT EXISTS incidents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      monitor_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      ai_report TEXT,
      status TEXT DEFAULT 'ongoing',
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      resolved_at DATETIME,
      FOREIGN KEY (monitor_id) REFERENCES monitors(id)
    );

    CREATE INDEX IF NOT EXISTS idx_monitors_user ON monitors(user_id);
    CREATE INDEX IF NOT EXISTS idx_checks_monitor ON checks(monitor_id);
    CREATE INDEX IF NOT EXISTS idx_incidents_monitor ON incidents(monitor_id);
  `);
}

export type User = {
  id: number;
  email: string;
  password_hash: string;
  org_name: string;
  org_slug: string;
  plan: string;
  created_at: string;
};

export type Monitor = {
  id: number;
  user_id: number;
  name: string;
  url: string;
  check_interval: number;
  timeout: number;
  status: string;
  last_checked: string | null;
  last_status_change: string | null;
  created_at: string;
};

export type Check = {
  id: number;
  monitor_id: number;
  status: string;
  response_time: number | null;
  status_code: number | null;
  error_message: string | null;
  checked_at: string;
};

export type Incident = {
  id: number;
  monitor_id: number;
  title: string;
  description: string | null;
  ai_report: string | null;
  status: string;
  started_at: string;
  resolved_at: string | null;
};
