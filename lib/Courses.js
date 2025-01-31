import sql from 'better-sqlite3';

const db = sql('courses.db');

export async function getCourses() {
    return db.prepare('SELECT * FROM courses').all();
}