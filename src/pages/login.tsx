import type { UserInfo } from '..'
import CloseIcon from '@mui/icons-material/Close'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Box, Container, IconButton, Typography } from '@mui/material'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { jwtDecode } from 'jwt-decode'

import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Login from '../components/Login'
import Register from '../components/Register'
import useWindowResize from '../hooks/useWindowResize'
import { useAppStore } from '../store'
import { getAccessToken, setAccessToken } from '../utils/token'

export interface LoginFormProps {
  email: string
  password: string
}

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const setCurrentUser = useAppStore(state => state.setUser)
  const navigate = useNavigate()
  const pageRef = useWindowResize()

  const handleClose = () => {
    return getCurrentWindow().close()
  }

  const afterGetToken = (token: string) => {
    setAccessToken(token)
    const decoded: UserInfo = jwtDecode(token)
    setCurrentUser(decoded)
  }

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) {
      navigate('/chat')
    }
  }, [navigate])

  return (
    <Container component="main" maxWidth="xs" ref={pageRef}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Box>
          {isLogin
            ? (
                <Login
                  onSwitch={() => setIsLogin(false)}
                  onGetToken={afterGetToken}
                />
              )
            : (
                <Register
                  onSwitch={() => setIsLogin(true)}
                  onGetToken={afterGetToken}
                />
              )}
        </Box>
      </Box>
    </Container>
  )
}

export default memo(LoginPage)
