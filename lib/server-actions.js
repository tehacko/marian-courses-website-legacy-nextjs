'use server';

import { redirect } from 'next/navigation';

import { saveCourse } from "./db-interactions";
import { revalidatePath } from 'next/cache';

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function createACourse (prevState, formData) {
    const course = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        course_description: formData.get('course_description'),
        lecturer: formData.get('name'),
        lecturer_email: formData.get('email'),
        image: formData.get('image')
    }

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
