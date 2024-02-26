'use client';
import React, {useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { Badge, Button, styled } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePageButton(
  { label, onClick, logout, numIndicators, marginTop }: { label: string, onClick?: string | (() => void), logout?: boolean, numIndicators?: number, marginTop?: string}
): React.ReactElement {
  const router = useRouter()
  const userContext = useContext(UserContext)

  const handleClick = () => {
    if (typeof onClick === 'string') {
      router.push(onClick)
    } else {
      if (logout) {
        userContext.setIsUserAuthenticated(false); 
        localStorage.clear();
        router.push('/login')
      }
      else if (onClick) {
        onClick()
      }
    }
  }

  const CustomButton = styled(Button)({
    backgroundColor: 'white',
    color: 'grey',
    '&:hover': {
      backgroundColor: 'white',
    },
  });

  return (
    <Badge color="info" invisible={numIndicators === undefined}  badgeContent={numIndicators} sx={{ width: '90%', marginTop: marginTop }}>
      <CustomButton sx={{ width: '100%' }} onClick={handleClick} variant="contained" size="large">{label}</CustomButton>
  </Badge>
  )
}