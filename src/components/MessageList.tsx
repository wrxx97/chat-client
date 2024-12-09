import type { Message, UserInfo } from '..'
import { useChatStore } from '@/store'
import { Avatar, Box, List, ListItem, Typography } from '@mui/material'
import dayjs from 'dayjs'

interface MessageListProps {
  messages: Message[]
  ref: React.RefObject<HTMLElement | null>
}

type MessageDetail = {
  sender: UserInfo
} & Message

function MessageList({ messages, ref }: MessageListProps) {
  const users = useChatStore(store => store.users)
  const currentUser = useChatStore(store => store.currentUser)!

  const getMessageDetail = (
    message: Message,
    isOwnMessage: boolean,
  ): MessageDetail => {
    const sender = isOwnMessage
      ? currentUser
      : users.find(user => user.id === message.sender_id)
    if (!sender) {
      throw new Error('Sender not found')
    }
    return {
      ...message,
      sender,
    }
  }

  return (
    <Box
      ref={ref}
      sx={{
        height: '100%',
        overflowY: 'auto',
        bgcolor: 'background.paper',
        p: 2,
      }}
    >
      <List>
        {messages.map((message) => {
          const isOwnMessage = message.sender_id === currentUser.id
          const msg = getMessageDetail(message, isOwnMessage)
          const sender = msg.sender!
          return (
            <ListItem
              key={message.id}
              sx={{
                display: 'flex',
                justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                mb: 1,
              }}
            >
              {!isOwnMessage && (
                <Avatar sx={{ mr: 2 }} alt={sender.fullname} src="">
                  {sender.fullname.charAt(0)}
                </Avatar>
              )}
              <Box
                sx={{
                  maxWidth: '75%',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  textAlign: isOwnMessage ? 'right' : 'left',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {!isOwnMessage && sender.fullname}
                </Typography>
                <Typography variant="body1">{message.content}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}
                >
                  {dayjs(message.created_at).format('DD MMM YYYY, h:mm A')}
                </Typography>
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default MessageList
