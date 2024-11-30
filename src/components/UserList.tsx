import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const chatData = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/40",
    name: "Alice",
    message: "Hi! How are you?",
    time: "10:30 AM",
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/40",
    name: "Bob",
    message: "See you tomorrow!",
    time: "9:15 AM",
  },
  {
    id: 3,
    avatar: "https://via.placeholder.com/40",
    name: "Charlie",
    message: "Let's catch up later.",
    time: "Yesterday",
  },
];

const ChatList = () => {
  return (
    <Box>
      <OutlinedInput
        id="input-with-icon-adornment"
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{
          width: "auto",
          m: 2,
          ".MuiOutlinedInput-input": {
            padding: "4px 14px",
          },
        }}
      />
      <List
        sx={{
          height: "100vh",
          borderRight: 1,
          borderColor: "divider",
          overflowY: "auto",
        }}
      >
        {[...chatData, ...chatData].map((chat) => (
          <React.Fragment key={chat.id}>
            <ListItem alignItems="flex-start" button>
              <ListItemAvatar>
                <Avatar alt={chat.name} src={chat.avatar} />
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
                      {chat.message}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      style={{ float: "right" }}
                    >
                      {chat.time}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
