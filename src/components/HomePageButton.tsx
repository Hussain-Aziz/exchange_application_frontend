'use client';
import React, {useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { Button, styled } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePageButton(
  { label, onClick, logout }: { label: string, onClick?: string | (() => void), logout?: boolean}
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
    <CustomButton onClick={handleClick} variant="contained" size="large">{label}</CustomButton>
  )
}