'use client';
import HomePageButton from '../../../components/HomePageButton'
export default function AdminHomeContent({approveApplication, newApplication}:{approveApplication: () => Promise<number>, newApplication: () => Promise<number>}){
  return (
    <>
      <HomePageButton onClick={'/admin/new_application'} label='New Applications' indicatorGetter={newApplication} marginTop='10px !important'/>
      <HomePageButton onClick={'/admin/approve_application'} label='Approve Applications' indicatorGetter={approveApplication} />
      <HomePageButton onClick={'/admin/view_student'} label='View Student Status' />
      <HomePageButton onClick={'/admin/edit_faculty'} label='Edit Faculty' />
    </>
  )
}