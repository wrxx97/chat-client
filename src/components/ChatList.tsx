import type { Chat } from '..'
import { useChatStore } from '@/store'
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { Fragment } from 'react'
import Search from './SearchHeader'

interface ChatListProps {
  chats: Chat[]
  onSelect: (chat: Chat) => void
}

function ChatList({ chats, onSelect }: ChatListProps) {
  const currentChat = useChatStore(state => state.currentChat)
  const handleChatClick = (chat: Chat) => {
    onSelect(chat)
  }

  return (
    <Box
      sx={{
        width: 300,
        height: '100%',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Search />
      <List
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {chats
          .sort((a, b) => (dayjs(a.created_at).isBefore(b.created_at) ? 0 : -1))
          .map(chat => (
            <Fragment key={chat.id}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => handleChatClick(chat)}
                selected={(currentChat?.id || -1) === chat.id}
              >
                <ListItemAvatar>
                  <Avatar alt={chat.name} src={chat.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={(
                    <Typography variant="subtitle1" noWrap>
                      {chat.name}
                    </Typography>
                  )}
                  secondary={(
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      >
                        {chat.name}
                      </Typography>
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        style={{ float: 'right' }}
                      >
                        {dayjs(chat.created_at).format('HH:mm')}
                      </Typography>
                    </>
                  )}
                />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
      </List>
    </Box>
  )
}

export default ChatList
