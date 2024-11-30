import { memo, useState } from "react";
import { Box, Typography, Container, Avatar, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { getCurrentWindow } from "@tauri-apps/api/window";

import Login from "../components/Login";
import Register from "../components/Register";

export interface LoginFormProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    return getCurrentWindow().close();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Sign In" : "Sign Up"}
        </Typography>
        <Box>
          {isLogin ? (
            <Login onSwitch={() => setIsLogin(false)} />
          ) : (
            <Register onSwitch={() => setIsLogin(true)} />
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default memo(LoginPage);
