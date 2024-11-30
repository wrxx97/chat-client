import { Box, Typography, Button, Container } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router";
import { memo } from "react";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: "success.main", mb: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Registration Successful!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Your account has been successfully created. You can now log in and
          start exploring our features.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default memo(RegistrationSuccess);
