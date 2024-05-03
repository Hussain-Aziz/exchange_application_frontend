'use client';
import HomePageButton from '../../../components/HomePageButton'
export default function AdminHomeContent(){
  return (
    <>
      <HomePageButton onClick={'/admin/new_application'} label='New Applications' numIndicators={2} marginTop='10px !important'/>
      <HomePageButton onClick={'/admin/approve_application'} label='Approve Applications' numIndicators={2} />
      <HomePageButton onClick={'/admin/view_student'} label='View Student Status' />
      <HomePageButton onClick={'/admin/edit_faculty'} label='Edit Faculty' />
    </>
  )
}