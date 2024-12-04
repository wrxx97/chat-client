import Grid from "@mui/material/Grid2";
import MessageList from "@components/MessageList";
import ChatList from "@components/ChatList";
import Header from "@components/Header";
import MessageSend from "@components/MessageSend";
import { Box } from "@mui/material";
import { useChatStore } from "@/store";
import { useEffect, useState } from "react";
import { getChatList, getChatMsgs } from "@/api/chat";
import { Message } from "@/index";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const chatList = useChatStore((state) => state.chatList);
  const currentChat = useChatStore((state) => state.currentChat);
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);
  const setChatList = useChatStore((state) => state.setChatList);

  useEffect(() => {
    if (currentChat) {
      // Fetch messages
      getChatMsgs(currentChat.id).then((messages) => {
        setMessages(messages);
      });
    }
  }, [currentChat]);

  useEffect(() => {
    // Fetch chat list
    getChatList().then((chatList) => {
      setChatList(chatList);
    });
  }, []);

  return (
    <>
      <ChatList chats={chatList} onSelect={setCurrentChat} />
      <Grid
        container
        sx={{
          height: "100%",
          width: "calc(100% - 350px)",
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Header />
            <MessageList messages={messages} />
            <MessageSend />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
