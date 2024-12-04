import client from ".";
import { CreateChat } from "..";

export const addChat = async (data: CreateChat) => {
  const res = await client.post("/chats", data);
  return res.data;
};

export const getChatList = async () => {
  const res = await client.get("/chats");
  return res.data;
};

export const getChatMsgs = async (chatId: number) => {
  const res = await client.get(`/chats/${chatId}/messages`);
  return res.data;
};

export const postMsgs = async (chatId: number, content: string) => {
  const res = await client.post(`/chats/${chatId}/messages`, { content });
  return res.data;
};
