import type { SubmitHandler } from 'react-hook-form'

import type { LoginInputs } from '..'
import { resizeChatWindow } from '@/utils/window'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { login } from '../api/auth'

interface LoginProps {
  onSwitch: () => void
  onGetToken: (token: string) => void
}

function Login({ onSwitch, onGetToken }: LoginProps) {
  const navgiate = useNavigate()
  const { register, handleSubmit } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    // console.log(data);
    const ret = await login(data)
    if (ret?.token) {
      onGetToken(ret.token)
      navgiate('/chat')
      resizeChatWindow()
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        id="email"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="email"
        variant="standard"
        autoFocus
        {...register('email', { required: true })}
      />
      <TextField
        id="password"
        required
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
        {...register('password', { required: true })}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" component="div">
          Don't have an account?
          <Typography
            variant="body2"
            component="span"
            sx={{
              textDecoration: 'none',
              cursor: 'pointer',
              color: 'primary.main',
            }}
            onClick={onSwitch}
          >
            Sign Up
          </Typography>
        </Typography>
      </Box>
    </Box>
  )
}

export default Login
