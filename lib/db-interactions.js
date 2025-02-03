import { S3 } from '@aws-sdk/client-s3';

import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

// const s3 = new S3({
//     region: 'us-east-1',
//     credentials: {
//     accessKeyId: process.env.local.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.local.AWS_SECRET_ACCESS_KEY,
//   },
//   });
const db = sql('courses.db');

export async function getCourses() {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM courses').all();
}

export function getCourse(slug) {
    const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(slug);
    return course || null; // Return null if no course is found
}

export async function saveCourse(course) {
    try {
        const twoSlugWords = course.title.split(" ").slice(0, 2).join(" "); // Take first two words
        const randomSlugAddition = Math.floor(Math.random() * 100) + 1;
        const modifiedTitle = `${twoSlugWords} ${randomSlugAddition}`;
        course.slug = slugify(modifiedTitle, { lower: true, strict: true }); // Convert to slug
        course.course_description = xss(course.course_description)
        
        const extension = course.image.name.split('.').pop();
        
        const fileName = `${course.slug}.${extension}`

        const stream = fs.createWriteStream(`public/${fileName}`)
        const bufferedImage = await course.image.arrayBuffer();

        stream.write(Buffer.from(bufferedImage), (error) => {
            if (error) {
                throw new Error('Ukládání obrázku selhalo!');
            }
        });

        // console.log("🔹 Uploading to S3: ", `public/${fileName}`);

        // await s3.putObject({
        //     Bucket: 'marian-courses-bucket',
        //     Key: `public/${fileName}`,
        //     Body: Buffer.from(bufferedImage),
        //     ContentType: course.image.type,
        // });

        // console.log("✅ Upload successful!");

        course.image = fileName;

        return db.prepare(`
            INSERT INTO courses 
                (date, slug, title, image, summary, course_description, lecturer, lecturer_email)
            VALUES (
                @date,
                @slug,
                @title,
                @image,
                @summary,
                @course_description,
                @lecturer,
                @lecturer_email
            )
        `).run(course);
        } catch (error) {
            console.error("❌ Upload failed:", error);
        }
    }


// SORTING COURSES

export function getLatestCourses() {
  return db.prepare('SELECT * FROM courses').slice(0, 3);
}

export function getAvailableCourseYears() {
  return db.prepare('SELECT * FROM courses').reduce((years, course) => {
    const year = new Date(course.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableCourseMonths(year) {
  return db.prepare('SELECT * FROM courses').reduce((months, course) => {
    const newsYear = new Date(course.date).getFullYear();
    if (newsYear === +year) {
      const month = new Date(course.date).getMonth();
      if (!months.includes(month)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getCoursesForYear(year) {
  return db.prepare('SELECT * FROM courses').filter(
    (course) => new Date(course.date).getFullYear() === +year
  );
}

export function getCoursesForYearAndMonth(year, month) {
  return db.prepare('SELECT * FROM courses').filter((course) => {
    const newsYear = new Date(course.date).getFullYear();
    const newsMonth = new Date(course.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}