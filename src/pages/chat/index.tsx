import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import NavBar from "@components/NavBar";
import Chat from "./Chat";
import User from "./User";
import { useEventSource } from "@/hooks/useEventSource";
import { getAccessToken } from "@/utils/token";
import { useEffect } from "react";
import { useChatStore } from "@/store";
import { Message } from "@/index";

enum EventTypes {
  NewChat = "NewChat",
  AddToChat = "AddToChat",
  RemoveFromChat = "RemoveFromChat",
  NewMessage = "NewMessage",
}

const ChatApp = () => {
  const { data, event } = useEventSource(
    `http://0.0.0.0:6687/events?access_token=${getAccessToken()}`,
    [
      EventTypes.NewChat,
      EventTypes.AddToChat,
      EventTypes.RemoveFromChat,
      EventTypes.NewMessage,
    ]
  );

  const addMessage = useChatStore((state) => state.addMessage);
  const currentChat = useChatStore((state) => state.currentChat);
  const currentUser = useChatStore((state) => state.currentUser);

  useEffect(() => {
    if (event) {
      switch (event) {
        case EventTypes.NewChat:
          console.log("NewChat", data);
          break;
        case EventTypes.AddToChat:
          console.log("AddToChat", data);
          break;
        case EventTypes.RemoveFromChat:
          console.log("RemoveFromChat", data);
          break;
        case EventTypes.NewMessage:
          if (!currentChat || !data) return;
          let msg = data as Message;
          if (
            msg.chat_id === currentChat.id &&
            msg.sender_id !== currentUser!.id
          ) {
            addMessage(msg);
          }
          break;
        default:
          console.log("Unknown event", event, data);
      }
    }
  }, [data, event]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Box>
  );
};

export default ChatApp;
