import db from './db';

export function getUsers() {
  const stmt = db.prepare('SELECT * FROM users');
  return stmt.all();
}
