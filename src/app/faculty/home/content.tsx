'use client';
import { useRouter } from 'next/navigation'
import HomePageButton from '../../../components/HomePageButton'
export default function FacultyHomeContent({faculty_type, courseRequests,
  syllabusRequests, approveApplication}: {faculty_type: number, courseRequests: () => Promise<number>, syllabusRequests: () => Promise<number>, approveApplication: () => Promise<number>}){

  const router = useRouter()

  const type = getFacultyType(faculty_type)

  return (
    <>
      {
      (type == 'Admin Assistant' || type == 'Head of Department' || type == 'Teaching Faculty' || type == 'Associate Dean' || type == 'Advisor') &&
      <HomePageButton onClick={'/faculty/course_requests'} label='View Course Approval Requests' indicatorGetter={courseRequests} marginTop='10px !important'/>
      }
      {(type == 'Admin Assistant'|| type == 'Head of Department') &&
        <HomePageButton onClick={'/faculty/syllabus_requests'} label='View Syllabus Requests' indicatorGetter={syllabusRequests} />
      }
      {(type == 'Advisor' || type == 'Associate Dean' || type == 'Scholarship' || type == 'Sponsorship') &&
        <HomePageButton onClick={'/faculty/approve_application'} label='Approve Applications' indicatorGetter={approveApplication} />
      }
    </>
  )
}

type FacultyType = 'Admin Assistant' | 'Teaching Faculty' | 'Head of Department' | 'Advisor' | 'Associate Dean' | 'Scholarship' | 'Sponsorship' | 'IXO'

function getFacultyType(faculty_type: number): FacultyType {
  switch(faculty_type){
    case 0:
      return 'Admin Assistant'
    case 1:
      return 'Teaching Faculty'
    case 2:
      return 'Head of Department'
    case 3:
      return 'Advisor'
    case 4:
      return 'Associate Dean'
    case 5:
      return 'Scholarship'
    case 6:
      return 'Sponsorship'
    case 7:
      return 'IXO'
    default:
      return 'Teaching Faculty'
  }
}