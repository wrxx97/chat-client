import React, { useEffect } from "react";
import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  ListItemButton,
} from "@mui/material";
import { Chat } from "..";
import Search from "./SearchHeader";
import { useChatStore } from "@/store";
import dayjs from "dayjs";

interface ChatListProps {
  chats: Chat[];
  onSelect: (chat: Chat) => void;
}

const ChatList = ({ chats, onSelect }: ChatListProps) => {
  const currentChat = useChatStore((state) => state.currentChat);
  const handleChatClick = (chat: Chat) => {
    onSelect(chat);
  };

  return (
    <Box
      sx={{
        width: 300,
        height: "100%",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Search />
      <List
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        {chats
          .sort((a, b) => (dayjs(a.created_at).isBefore(b.created_at) ? 0 : -1))
          .map((chat) => (
            <React.Fragment key={chat.id}>
              <ListItemButton
                alignItems="flex-start"
                onClick={() => handleChatClick(chat)}
                selected={(currentChat?.id || -1) === chat.id}
              >
                <ListItemAvatar>
                  <Avatar alt={chat.name} src={chat.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" noWrap>
                      {chat.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
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
                        style={{ float: "right" }}
                      >
                        {dayjs(chat.created_at).format("HH:mm")}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
      </List>
    </Box>
  );
};

export default ChatList;
