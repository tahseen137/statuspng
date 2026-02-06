import bcrypt from 'bcryptjs';
import { getDb, type User } from './db';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createUser(email: string, password: string, orgName: string, orgSlug: string, plan: string = 'free') {
  const db = getDb();
  const passwordHash = bcrypt.hashSync(password, 10);
  
  const stmt = db.prepare(`
    INSERT INTO users (email, password_hash, org_name, org_slug, plan)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(email, passwordHash, orgName, orgSlug, plan);
  return result.lastInsertRowid;
}

export function getUserByEmail(email: string): User | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
}

export function getUserById(id: number): User | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User | undefined;
}

export function getUserBySlug(slug: string): User | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM users WHERE org_slug = ?');
  return stmt.get(slug) as User | undefined;
}

export function generateOrgSlug(orgName: string): string {
  return orgName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
