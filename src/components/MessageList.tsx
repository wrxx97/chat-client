import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";

const MessageList = ({ messages, currentUser }) => {
  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        bgcolor: "background.paper",
        p: 2,
      }}
    >
      <List>
        {messages.map((message, index) => {
          const isOwnMessage = message.sender === currentUser;
          return (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: isOwnMessage ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              {!isOwnMessage && (
                <Avatar
                  sx={{ mr: 2 }}
                  alt={message.sender}
                  src={message.avatar || ""}
                >
                  {message.sender.charAt(0)}
                </Avatar>
              )}
              <Box
                sx={{
                  maxWidth: "75%",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  color: "text.primary",
                  textAlign: isOwnMessage ? "right" : "left",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {!isOwnMessage && message.sender}
                </Typography>
                <Typography variant="body1">{message.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", mt: 0.5, color: "text.secondary" }}
                >
                  {message.timestamp}
                </Typography>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default MessageList;
