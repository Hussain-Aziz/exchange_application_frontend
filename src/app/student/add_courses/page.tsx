import AddCourseForm from './AddCourseForm';
import { getAUSCoursesList } from './CoursesList'
import { listCoursesEndpoint } from '../../../constants/endpoints';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export default async function Page() {
  let courses = await getAUSCoursesList()
  courses = [...courses, {code: 'ELC 000', name: 'Free Elective'}, {code: 'GER 000', name: 'Arts and Literature'}];

  const subjects = courses.map((course) => course.code.split(' ')[0]).filter((v, i, a) => a.indexOf(v) === i);

  const submitToBackend = async (data: any) => {
    "use server"
    const response = await fetch(listCoursesEndpoint, {
      method: 'POST',
      headers: {
        "Authorization": "TOKEN " + cookies().get('token').value
      },
      body: JSON.stringify(data)
    })

    const body = await response.json()
    //take first 200 characters of body

    console.log(data, body)
    
    revalidatePath('/student/view_courses')
    
  }

  return (
    <AddCourseForm AusCourses={courses} AusSubjects={subjects} submitToBackend={submitToBackend}/>
  );
}