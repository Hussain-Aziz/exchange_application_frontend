import React from 'react'
import HomePageButton from '../../../components/HomePageButton'

export default function Page() {
  // TODO: implement num inidicators
  return (
    <>
      <HomePageButton onClick={'/teaching_faculty/course_requests'} label='View Course Approval Requests' numIndicators={2} marginTop='10px !important'/>
      <HomePageButton onClick={'/teaching_faculty/syllabus_requests'} label='View Syllabus Requests' numIndicators={2} />
    </>
  )
}