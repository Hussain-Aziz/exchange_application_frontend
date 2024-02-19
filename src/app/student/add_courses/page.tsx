import AddCourseForm from './AddCourseForm';
import { getAUSCoursesList } from './CoursesList'

export default async function Page() {
  let courses = await getAUSCoursesList()
  courses = [...courses, {code: 'ELC 000', name: 'Free Elective'}, {code: 'GER 000', name: 'Arts and Literature'}];

  const subjects = courses.map((course) => course.code.split(' ')[0]).filter((v, i, a) => a.indexOf(v) === i);

  return (
    <AddCourseForm AusCourses={courses} AusSubjects={subjects} />
  );
}