import Link from "next/link";

export default function EventsPage(){
    return (
        <main>
            <h1>Courses Calendar</h1>
            <p>
                <Link href="/courses/course-1" className="hover:underline">Course 1</Link>
            </p>
            <p>
                <Link href="/courses/course-2" className="hover:underline">Course 2</Link>
            </p>
        </main>
    );
}