'use client';
import React, { useEffect } from "react";
import { Badge, Button, styled } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePageButton(
  { label, onClick, indicatorGetter, marginTop }: { label: string, onClick?: string | (() => void), indicatorGetter?: () => Promise<number>, marginTop?: string}
): React.ReactElement {
  const router = useRouter()

  const handleClick = () => {
    if (typeof onClick === 'string') {
      router.push(onClick)
    } else if (onClick) {
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

  const [numIndicators, setNumIndicators] = React.useState<number | undefined>(undefined)

  useEffect(() => {
    if (indicatorGetter) {
      indicatorGetter().then(setNumIndicators)
    }
  }, [indicatorGetter])



  return (
    <Badge color="info" invisible={numIndicators === undefined}  badgeContent={numIndicators} sx={{ width: '90%', marginTop: marginTop }}>
      <CustomButton sx={{ width: '100%' }} onClick={handleClick} variant="contained" size="large">{label}</CustomButton>
  </Badge>
  )
}