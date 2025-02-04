import CourseList from "@/components/Courses/CourseList";
import { getLatestCourses } from "@/lib/db-interactions";

export default function LatestCoursesPage() {
    const latestCourses = getLatestCourses();
    return (
        <>
            <h1>Nejnovější kurzy</h1>;
        </>
    );
}