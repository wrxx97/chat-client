import client from ".";

export const getChatList = async () => {
  const res = await client.get("/chats");
  return res.data;
};
