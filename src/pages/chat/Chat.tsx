import type { Message } from '@/index'
import { getChatList, getChatMsgs, postMsgs } from '@/api/chat'
import useScrollToBottom from '@/hooks/useScrollToBottom'
import { useChatStore } from '@/store'
import ChatList from '@components/ChatList'
import Header from '@components/Header'
import MessageList from '@components/MessageList'
import MessageSend from '@components/MessageSend'
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { memo, useEffect, useOptimistic, useTransition } from 'react'

function Chat() {
  const messages = useChatStore(state => state.messages)
  const setMessages = useChatStore(state => state.setMessages)
  const chatList = useChatStore(state => state.chatList)
  const currentChat = useChatStore(state => state.currentChat)
  const setCurrentChat = useChatStore(state => state.setCurrentChat)
  const setChatList = useChatStore(state => state.setChatList)
  const currentUser = useChatStore(state => state.currentUser)

  const [scrollRef, scrollToBottom] = useScrollToBottom()
  const [_, startTransition] = useTransition()
  const [optMsgs, addOptMsgs] = useOptimistic<Message[], string>(
    messages,
    (state, content) => [
      ...state,
      {
        chat_id: currentChat!.id,
        sender_id: currentUser!.id,
        content,
        created_at: new Date().toISOString(),
        _sending: true,
      },
    ],
  )

  const handleSend = async (content: string) => {
    startTransition(() => {
      addOptMsgs(content)
    })

    postMsgs({
      chatId: currentChat!.id,
      content,
      senderId: currentUser!.id,
    }).then((data) => {
      scrollRef.current && scrollToBottom()
      setMessages([...messages, data])
    })
  }

  useEffect(() => {
    let timer: number
    if (currentChat) {
      // Fetch messages
      getChatMsgs(currentChat.id).then((messages) => {
        setMessages(messages.reverse())
        timer = window.setTimeout(() => scrollToBottom('instant'), 20)
      })
    }
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat])

  useEffect(() => {
    getChatList().then((chatList) => {
      setChatList(chatList)
      if (!currentChat && chatList.length) {
        setCurrentChat(chatList[0])
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ChatList chats={chatList} onSelect={setCurrentChat} />
      <Grid
        container
        sx={{
          height: '100%',
          width: 'calc(100% - 350px)',
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
        }}
      >
        <Grid
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Box
            sx={{
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Header />
            <MessageList ref={scrollRef} messages={optMsgs} />
            <MessageSend onSendMessage={handleSend} />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default memo(Chat)
