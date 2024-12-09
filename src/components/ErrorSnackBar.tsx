import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import { useError } from '../hooks/useError'

const ErrorSnackbar: React.FC = () => {
  const { error, clearError } = useError()

  return (
    <Snackbar
      open={!!error}
      onClose={clearError}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity="error" onClose={clearError}>
        {error}
      </Alert>
    </Snackbar>
  )
}

export default ErrorSnackbar
