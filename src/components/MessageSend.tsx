import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'

interface MessageSendProps {
  onSendMessage: (content: string) => void
}

function MessageSend({ onSendMessage }: MessageSendProps) {
  const [currentMessage, setCurrentMessage] = useState('')

  const handleSend = () => {
    onSendMessage(currentMessage)
    setCurrentMessage('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        // Ctrl+Enter：插入换行
        setCurrentMessage(prev => `${prev}\n`)
      }
      else {
        // Enter：发送消息
        e.preventDefault() // 防止换行
        if (currentMessage.trim() !== '') {
          onSendMessage(currentMessage.trim())
          setCurrentMessage('') // 清空输入框
        }
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        m: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type a message..."
        multiline
        value={currentMessage}
        minRows={1}
        maxRows={5}
        onKeyDown={handleKeyDown}
        onChange={e => setCurrentMessage(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ ml: 2 }}
        onClick={handleSend}
      >
        Send
      </Button>
    </Box>
  )
}

export default MessageSend
