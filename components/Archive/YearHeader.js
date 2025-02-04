import Link from "next/link";
import classes from '@/app/page.module.css'
import { getAvailableCourseYears } from "@/lib/db-interactions";

export default function YearHeader() {
    const courseYearLinks = getAvailableCourseYears();
    return (
        <>
            <header className={`${classes.highlight} ${classes.subheader}`}>
                <h1>Archiv kurzů</h1>
                <ul className={classes.yearslist}>
                    {courseYearLinks.map(link => <li key={link}>
                        <Link href={`/archive/${link}`}>{link}</Link>
                    </li>
                )}
                </ul>
            </header>
        </>
    );
}