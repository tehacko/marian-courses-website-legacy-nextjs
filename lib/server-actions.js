'use server';

import { redirect } from 'next/navigation';

import { saveCourse } from "./db-interactions";
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function createACourse (prevState, formData) {
    // Get the current date
    const today = new Date();

    // Extract the year, day, and month
    const year = today.getFullYear();
    const day = String(today.getDate()).padStart(2, '0'); // Ensure day is two digits
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits (months are zero-indexed)

    // Format the date as YYYY-DD-MM
    const formattedDate = `${year}-${day}-${month}`;

    console.log(formattedDate); // Output will be in the format YYYY-DD-MM

    const course = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        course_description: formData.get('course_description'),
        lecturer: formData.get('name'),
        lecturer_email: formData.get('email'),
        image: formData.get('image'),
        date: formattedDate
    }

    console.log(course);

    if (
      isInvalidText(course.title) ||
      isInvalidText(course.summary) ||
      isInvalidText(course.course_description) ||
      isInvalidText(course.lecturer) ||
      isInvalidText(course.lecturer_email) ||
      !course.lecturer_email.includes('@') ||
      !course.image ||
      course.image.size === 0
    ) {
        return {
            message: 'Je třeba vyplnit všechna pole validním obsahem.'
        }
    }
  

    await saveCourse(course);
    revalidatePath('/courses');
    redirect('/courses')
}
