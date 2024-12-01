import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MessageList from "../components/MessageList";
import ChatList from "../components/ChatList";
import Header from "../components/Header";
import MessageSend from "../components/MessageSend";
import NavBar from "../components/NavBar";
import { useChatStore } from "../store";

const ChatApp = () => {
  const queryChatList = useChatStore((state) => state.queryChat);

  useEffect(() => {
    queryChatList();
  }, []);

  const [messages, setMessages] = useState([
    {
      sender: "Alice",
      text: "Hello there!",
      timestamp: "10:00 AM",
      avatar: "", // 可以为图片 URL
    },
    {
      sender: "Bob",
      text: "Hi Alice, how are you?",
      timestamp: "10:01 AM",
    },
    {
      sender: "Alice",
      text: "I'm good, thank you! How about you?",
      timestamp: "10:02 AM",
    },
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const currentUser = "Bob";
  const chatList = useChatStore((state) => state.chatList);

  const handleSend = () => {
    if (currentMessage.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: currentUser,
          text: currentMessage,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setCurrentMessage("");
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <NavBar>
        <ChatList chats={chatList} />
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
              <MessageList messages={messages} currentUser={currentUser} />
              <MessageSend />
            </Box>
          </Grid>
        </Grid>
      </NavBar>
    </Box>
  );
};

export default ChatApp;
