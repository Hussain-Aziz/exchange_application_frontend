'use client'
import React from 'react'
import {
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpIcon from '@mui/icons-material/Help';
import { isMobile } from 'react-device-detect';
import AccountCircle from '@mui/icons-material/AccountCircle';


export function LogoutButton({ logout }: { logout: () => void }): React.ReactNode {
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='logout-button'>
      <Tooltip title="Help">
        <IconButton onClick={handleLogout}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Account">
        <IconButton onClick={handleClick}>
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export function BackButton(): React.ReactNode {
  const router = useRouter()
  const handleBack = () => {
    if (!window.location.pathname.endsWith('home')) {
      router.push(window.location.pathname + '/../')
    }
  }
  return (
    <Tooltip title="Back">
      <IconButton onClick={handleBack}>
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  )
}

export function Header({ portalHeader }: { portalHeader: string }): React.ReactNode {
  return (
    <Stack spacing={1} direction={"column"}>
        <Typography variant={"h5"} component="div" className="home-heading" paddingInline={1}>
          AUS Exchange Program Portal
        </Typography>
      <Typography variant={"h6"} component="div" paddingInline={1}>
        {portalHeader}
      </Typography>
    </Stack>
  )
}