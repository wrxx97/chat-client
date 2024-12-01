import { Box, TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { register as registerUser } from "../api/auth";
import { RegisterInputs } from "..";

interface RegisterProps {
  onSwitch: () => void;
  onGetToken: (token: string) => void;
}

const Register = ({ onSwitch, onGetToken }: RegisterProps) => {
  const navgiate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const ret = await registerUser(data);
    if (ret?.token) {
      onGetToken(ret.token);
      navgiate("/feedback");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            fullWidth
            id="fullname"
            label="Full Name"
            variant="standard"
            {...register("fullname", { required: true })}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Workspace"
            variant="standard"
            {...register("workspace", { required: true })}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="standard"
            {...register("email", { required: true })}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="standard"
            {...register("password", { required: true })}
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Grid container justifyContent="center">
        <Grid>
          <Typography variant="body2" component="div">
            Already have an account?
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
              Sign in
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
