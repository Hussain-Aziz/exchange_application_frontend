'use client';
import { useRouter } from 'next/navigation'
import HomePageButton from '../../../components/HomePageButton'
export default function FacultyHomeContent({faculty_type}: {faculty_type: number}){

  const router = useRouter()

  const type = getFacultyType(faculty_type)

  return (
    <>
      {
      (type == 'Admin Assistant' || type == 'Head of Department' || type == 'Teaching Faculty' || type == 'Associate Dean' || type == 'Advisor') &&
      <HomePageButton onClick={'/faculty/course_requests'} label='View Course Approval Requests' numIndicators={2} marginTop='10px !important'/>
      }
      {(type == 'Admin Assistant') &&
        <HomePageButton onClick={'/faculty/syllabus_requests'} label='View Syllabus Requests' numIndicators={2} />
      }
      {(type == 'Advisor' || type == 'Associate Dean' || type == 'Scholarship' || type == 'Sponsorship') &&
        <HomePageButton onClick={'/faculty/approve_application'} label='Approve Applications' numIndicators={2} />
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