import React from "react";
import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  Box,
  InputAdornment,
  OutlinedInput,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { UserInfo } from "..";
import dayjs from "dayjs";

interface UserListProps {
  users: UserInfo[];
  onSelect: (user: UserInfo) => void;
}

const UserList = ({ users, onSelect }: UserListProps) => {
  const [selected, setSelected] = React.useState(-1);

  const handleSelect = (index: number) => {
    const user = users[index];
    setSelected(index);
    console.log("Selected user:", index);
    onSelect(user);
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
          height: "100%",
          overflowY: "auto",
        }}
      >
        {users.map((user, index) => (
          <React.Fragment key={user.id}>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => handleSelect(index)}
              selected={selected === index}
            >
              <ListItemAvatar>
                <Avatar alt={user.fullname} src={user.fullname} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" noWrap>
                    {user.fullname}
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
                      {user.fullname}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      style={{ float: "right" }}
                    >
                      {dayjs(user.created_at).format("DD MMM YYYY")}
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

export default UserList;
