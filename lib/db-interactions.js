import { S3 } from '@aws-sdk/client-s3';

import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3({
    region: 'us-east-1'
  });
const db = sql('courses.db');

export async function getCourses() {
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM courses').all();
}

export function getCourse(slug) {
    return db.prepare('SELECT * FROM courses WHERE slug = ?').get(slug);
}

export async function saveCourse(course) {
    const twoSlugWords = course.title.split(" ").slice(0, 2).join(" "); // Take first two words
    const randomSlugAddition = Math.floor(Math.random() * 100) + 1;
    const modifiedTitle = `${twoSlugWords} ${randomSlugAddition}`;
    course.slug = slugify(modifiedTitle, { lower: true, strict: true }); // Convert to slug
    course.course_description = xss(course.course_description)
    
    const extension = course.image.name.split('.').pop();
    
    const fileName = `${course.slug}.${extension}`

    const stream = fs.createWriteStream(`public/${fileName}`)
    const bufferedImage = await course.image.arrayBuffer();

    // stream.write(Buffer.from(bufferedImage), (error) => {
    //     if (error) {
    //         throw new Error('Ukládání obrázku selhalo!');
    //     }
    // });

    s3.putObject({
        Bucket: 'marian-courses-bucket/public/',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
      });

    course.image = fileName;

    return db.prepare(`
        INSERT INTO courses 
            (slug, title, image, summary, course_description, lecturer, lecturer_email)
        VALUES (
            @slug,
            @title,
            @image,
            @summary,
            @course_description,
            @lecturer,
            @lecturer_email
        )
    `).run(course);
}