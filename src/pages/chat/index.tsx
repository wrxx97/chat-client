import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import NavBar from "@components/NavBar";
import Chat from "./Chat";
import User from "./User";

const ChatApp = () => {
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
