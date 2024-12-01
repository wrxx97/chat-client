import { Route, Routes } from "react-router";
import Chat from "./pages/chat";
import Login from "./pages/login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Feedback from "./pages/feedback";
import "./App.css";
import { Box } from "@mui/material";
import { useMemo, useRef } from "react";
import { useAppStore } from "./store";
import { ErrorProvider } from "./hooks/useError";
import ErrorSnackbar from "./components/ErrorSnackBar";

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  const darkMode = useAppStore((state) => state.darkMode);
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
      },
    });
  }, [darkMode]);

  return (
    <ErrorProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
          data-tauri-drag-region
          ref={mainRef}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Box>
      </ThemeProvider>
      <ErrorSnackbar />
    </ErrorProvider>
  );
}

export default App;
