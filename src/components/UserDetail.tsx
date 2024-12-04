import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { UserInfo } from "..";
import { addChat } from "@/api/chat";
import { useChatStore } from "@/store";
import { useNavigate } from "react-router";

interface UserDetailProps {
  user: UserInfo | null;
}

const UserDetails = ({ user }: UserDetailProps) => {
  const currentUser = useChatStore((state) => state.currentUser)!;
  const setCurrentChat = useChatStore((state) => state.setCurrentChat);
  const navgiate = useNavigate();

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "calc(100% - 350px)",
          backgroundColor: "#f5f5f5",
          padding: 2,
        }}
      >
        <Typography variant="h5">Please select a user</Typography>
      </Box>
    );
  }

  const handleAddChat = () => {
    addChat({
      name: "default",
      members: [user.id, currentUser.id],
      public: false,
    }).then((res) => {
      navgiate(`/chat?chat_id=${res.id}`);
      setCurrentChat(res);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "calc(100% - 350px)",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Typography variant="subtitle1" color="textSecondary">
                Full Name:
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{user.fullname}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography variant="subtitle1" color="textSecondary">
                Email:
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>

            <Grid size={4}>
              <Typography variant="subtitle1" color="textSecondary">
                Created At:
              </Typography>
            </Grid>
            <Grid size={8}>
              <Typography variant="body1">
                {dayjs(user.created_at).format("DD MMM YYYY")}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddChat}
            >
              Send Message
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserDetails;
