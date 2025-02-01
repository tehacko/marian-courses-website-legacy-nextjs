import Image from 'next/image';

import { notFound } from 'next/navigation';
import { getCourse } from '@/lib/db-interactions'
import classes from './page.module.css'


export default async function CourseDetailsPage( { params } ) {
    const course = await getCourse(params.Courseslug);
    
    if (!course) {
        notFound();
    }

    course.course_description = course.course_description.replace(/\n/g, '<br />');

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={'/' + `${course.image}`} alt={course.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>{course.title}</h1>
                    <p className={classes.lecturer}></p>
                        by <a href={`mailto:${course.lecturer_email}`}>{course.lecturer}</a>
                </div>
                <p className={classes.summary}>{course.summary}</p>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: course.course_description,
                }}></p>
                <h1>{params.slug} Page</h1>
            </main>
        </>
    );
}