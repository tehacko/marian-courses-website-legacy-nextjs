'use server';

import { redirect } from 'next/navigation';

import { saveCourse } from "./db-interactions";

export async function createACourse (formData) {
    const course = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        course_description: formData.get('course_description'),
        image: formData.get('image'),
        lecturer: formData.get('name'),
        lecturer_email: formData.get('email')
    }

    await saveCourse(course);
    redirect('/courses')
}
