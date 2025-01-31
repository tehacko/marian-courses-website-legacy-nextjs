import Link from "next/link";
import classes from "./page.module.css";
import CoursesGrid from "@/components/Courses/CoursesGrid";

export default function CoursesPage(){
    return (
        <>
            <header className={classes.header}>
                <h1>Kurzy vytvořené {''}
                    <span className={classes.highlight}>jen pro vás</span>
                </h1>
                                <p>
                    Vyberte svůj kurz na míru a zažijte proměnu!
                </p>
                <p className={classes.cta}>
                    <Link href="/courses/create">Přidat kurz</Link>
                </p>
            </header>
            <main className={classes.main}>
                <CoursesGrid courses={[]}/>
                <h1>Courses Calendar</h1>
                <p>
                    <Link href="/courses/course-1" className="hover:underline">Course 1</Link>
                </p>
                <p>
                    <Link href="/courses/course-2" className="hover:underline">Course 2</Link>
                </p>
        </main>
        </>
    );
}