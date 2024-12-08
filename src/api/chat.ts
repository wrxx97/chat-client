import client from ".";
import { CreateChat, PostMessage } from "..";

export const addChat = async (data: CreateChat) => {
  const res = await client.post("/chats", data);
  return res.data;
};

export const getChatList = async () => {
  const res = await client.get("/chats");
  return res.data;
};

export const getChatMsgs = async (chatId: number) => {
  if (!chatId) return [];
  const res = await client.get(`/chats/${chatId}/messages`);
  return res.data;
};

export const postMsgs = async ({ chatId, content, senderId }: PostMessage) => {
  const res = await client.post(`/chats/${chatId}/messages`, {
    content,
    chat_id: chatId,
    sender_id: senderId,
  });
  return res.data;
};
