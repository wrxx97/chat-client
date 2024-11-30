import { Box, TextField, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface LoginInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterProps {
  onSwitch: () => void;
}

const Register = ({ onSwitch }: RegisterProps) => {
  const navgiate = useNavigate();
  const { register, handleSubmit } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    navgiate("/feedback");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <TextField
            fullWidth
            label="First Name"
            autoFocus
            variant="standard"
            {...register("firstName", { required: true })}
          />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 6,
          }}
        >
          <TextField
            fullWidth
            id="lastName"
            label="Last Name"
            variant="standard"
            {...register("lastName", { required: true })}
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
