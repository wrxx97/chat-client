import { Box, TextField, Button, Typography } from "@mui/material";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { login } from "../api/auth";
import { LoginInputs } from "..";

interface LoginProps {
  onSwitch: () => void;
  onGetToken: (token: string) => void;
}

const Login = ({ onSwitch, onGetToken }: LoginProps) => {
  const navgiate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    // console.log(data);
    let ret = await login(data);
    console.log(ret);
    if (ret?.token) {
      onGetToken(ret.token);
      navgiate("/chat");
      const appWindow = getCurrentWindow();
      appWindow.setSize(new LogicalSize(800, 600));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
      <TextField
        id="email"
        margin="normal"
        required
        fullWidth
        label="Email Address"
        autoComplete="email"
        variant="standard"
        autoFocus
        {...register("email", { required: true })}
      />
      <TextField
        id="password"
        required
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="standard"
        {...register("password", { required: true })}
      />

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" component="div">
          Don't have an account?
          <Typography
            variant="body2"
            component="span"
            sx={{
              textDecoration: "none",
              cursor: "pointer",
              color: "primary.main",
            }}
            onClick={onSwitch}
          >
            Sign Up
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
