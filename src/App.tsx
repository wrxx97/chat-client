import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useMemo, useRef } from 'react'
import { Route, Routes } from 'react-router'
import { ErrorProvider } from './components/ErrorProvider'
import ErrorSnackbar from './components/ErrorSnackBar'
import ChatLayout from './pages/chat'
import Feedback from './pages/feedback'
import Login from './pages/login'
import { useAppStore } from './store'
import './App.css'

function App() {
  const mainRef = useRef<HTMLDivElement>(null)

  const darkMode = useAppStore(state => state.darkMode)
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
      },
    })
  }, [darkMode])

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
          data-tauri-drag-region
          ref={mainRef}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/chat/*" element={<ChatLayout />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Box>
      </ThemeProvider>
      <ErrorSnackbar />
    </ErrorProvider>
  )
}

export default App
