import MaximizeIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CloseIcon from '@mui/icons-material/Close'
import MinimizeIcon from '@mui/icons-material/Minimize'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'

import { getCurrentWindow } from '@tauri-apps/api/window'

function Header() {
  const handleMinimize = () => {
    return getCurrentWindow().minimize()
  }

  const handleMaximize = () => {
    return getCurrentWindow().maximize()
  }

  const handleClose = () => {
    return getCurrentWindow().close()
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
      data-tauri-drag-region
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
        data-tauri-drag-region
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component="div"
            sx={{ color: 'text.primary' }}
          >
            News
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Tooltip title="Minimize">
            <IconButton onClick={handleMinimize}>
              <MinimizeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Maximize">
            <IconButton onClick={handleMaximize}>
              <MaximizeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Close">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
