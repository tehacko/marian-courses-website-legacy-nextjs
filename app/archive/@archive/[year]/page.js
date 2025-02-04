import CourseList from "@/components/Courses/CourseList";
import { getCoursesForYear } from "@/lib/db-interactions";
import CoursesGrid from "@/components/Courses/CoursesGrid";
import YearHeader from "@/components/Archive/YearHeader";


export default async function FilteredCoursesPage({params}) {
    
    function LoadingFilteredCourses() {
        const courseYear = params.year;
        const courses = getCoursesForYear(courseYear);
        return <CoursesGrid courses={courses}/>
    }

    return (
        <>
            <YearHeader />
            <CourseList loader={LoadingFilteredCourses} /> 
        </>
    );
}