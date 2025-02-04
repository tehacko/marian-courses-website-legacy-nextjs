import Link from "next/link";
import { getAvailableCourseYears } from "@/lib/db-interactions"

export default function CoursesArchivePage() {
const courseYearLinks = getAvailableCourseYears();

    return <header id="archive-header">
        <nav>
            <h1>Archiv kurzů</h1>
            <ul>
                {courseYearLinks.map(link => <li key={link}>
                    <Link href={`/archive/${link}`}>{link}</Link>
                </li>
            )}


            </ul>

        </nav>
        
        </header>
}