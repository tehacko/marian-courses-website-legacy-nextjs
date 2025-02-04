import CourseList from "@/components/Courses/CourseList";
import { getCoursesForYear } from "@/lib/db-interactions";
import CoursesGrid from "@/components/Courses/CoursesGrid";


export default async function FilteredCoursePage({params}) {
    
    function LoadingFilteredCourses() {
        const courseYear = params.year;
        const courses = getCoursesForYear(courseYear);
        return <CoursesGrid courses={courses}/>
    }
    
    return <CourseList loader={LoadingFilteredCourses} />
}