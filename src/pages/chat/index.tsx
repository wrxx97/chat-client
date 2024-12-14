import type { Message } from '@/index'
import { useEventSource } from '@/hooks/useEventSource'
import { useChatStore } from '@/store'
import { getAccessToken } from '@/utils/token'
import NavBar from '@components/NavBar'
import { Box } from '@mui/material'
import { memo, useEffect, useMemo } from 'react'
import { Route, Routes } from 'react-router'
import { useShallow } from 'zustand/react/shallow'
import Chat from './Chat'
import User from './User'

enum EventTypes {
  NewChat = 'NewChat',
  AddToChat = 'AddToChat',
  RemoveFromChat = 'RemoveFromChat',
  NewMessage = 'NewMessage',
  HeartBeat = 'heartbeat',
}

function ChatApp() {
  const events = useMemo(() => [
    EventTypes.NewChat,
    EventTypes.AddToChat,
    EventTypes.RemoveFromChat,
    EventTypes.NewMessage,
    EventTypes.HeartBeat,
  ], [])

  const { data, event } = useEventSource(
    `${
      import.meta.env.VITE_NOTIFICATION_SERVER_HOST
    }/events?access_token=${getAccessToken()}`,
    events,
  )

  const { addMessage, currentChat, currentUser } = useChatStore(
    useShallow(state => ({
      addMessage: state.addMessage,
      currentChat: state.currentChat,
      currentUser: state.currentUser,
    })),
  )

  useEffect(() => {
    const msg = data as Message
    if (event) {
      switch (event) {
        case EventTypes.NewChat:
          break
        case EventTypes.AddToChat:
          break
        case EventTypes.RemoveFromChat:
          break
        case EventTypes.NewMessage:
          if (!currentChat || !msg)
            return
          if (
            msg.chat_id === currentChat.id
            && msg.sender_id !== currentUser!.id
          ) {
            addMessage(msg)
          }
          break
        default:
          break
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, data])

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Box>
  )
}

export default memo(ChatApp)
