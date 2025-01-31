import sql from 'better-sqlite3';

const db = sql('courses.db');

export async function getCourses() {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM courses').all();
}

export function getCourse(slug) {
    return db.prepare('SELECT * FROM courses WHERE slug = ?').get(slug);
}