import type { CreateChat, PostMessage } from '..'
import client from '.'

export async function addChat(data: CreateChat) {
  const res = await client.post('/chats', data)
  return res.data
}

export async function getChatList() {
  const res = await client.get('/chats')
  return res.data
}

export async function getChatMsgs(chatId: number) {
  if (!chatId)
    return []
  const res = await client.get(`/chats/${chatId}/messages`)
  return res.data
}

export async function postMsgs({ chatId, content, senderId }: PostMessage) {
  const res = await client.post(`/chats/${chatId}/messages`, {
    content,
    chat_id: chatId,
    sender_id: senderId,
  })
  return res.data
}
