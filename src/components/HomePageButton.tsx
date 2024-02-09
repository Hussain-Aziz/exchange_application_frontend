import React from "react";
import { Button, styled } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePageButton(
  { label, onClick }: { label: string, onClick: string | (() => void) }
): React.ReactElement {
  const router = useRouter()

  const handleClick = () => {
    if (typeof onClick === 'string') {
      router.push(onClick)
    } else {
      onClick()
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