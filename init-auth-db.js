const sql = require('better-sqlite3');

const db = sql('authentications.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT
  );
`);

db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);

db.exec(`
  CREATE TABLE IF NOT EXISTS course_subscriptions (
    id INTEGER PRIMARY KEY,
    title TEXT,
    image TEXT,
    description TEXT
  );
`);

const hasSubscriptions =
  db.prepare('SELECT COUNT(*) as count FROM course_subscriptions').get().count > 0;

if (!hasSubscriptions) {
  db.exec(`
    INSERT INTO course_subscriptions (title, image, description)
    VALUES
    ('Zoltán', '/zoltan-zdravozivotnestylovy.png', 'Představujeme nejnovější a nejefektivnější metodu zdravého stravování.'),
    ('Veronika', '/veronika-vytvarna.png', 'Když máš talent, dej o sobě vědět!'),
    ('Barbora', '/barbora-botanickozkoumava.png', 'Zjednodušte si údržbu zeleně v domácnosti a na zahradě automatizovaným nástrojem Smart-Greenery.'),
    ('Bedřich', '/bedrich-businessosportovni.png', 'Získej rovnouváhu ducha, duše i těla.'),
    ('Sára', '/jo-73.png', 'Dáme to.'),
    ('Uršula', '/ursula-umeleckovedecka.png', 'Jak vyvolat a upevnit zájem designer firem k zadávání uměleckých zakázek u vás na univerzitě.'),
    ('Valerie', '/valerie-vynalezava.png', 'Buďte mezi tisícemi žen, které využívají revoluční metody líčení s Make-U-Up.');
`);
}

module.exports = db;
