import React, { useState, ReactNode } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import { useAppStore } from "../store";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navgiate = useNavigate();
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);
  const logout = useAppStore((state) => state.logout);

  // 根据当前路由计算选中的tab
  function getSelectedTab(): string {
    const path = window.location.pathname;
    if (path === "/chat/user") {
      return "/user";
    }
    return "/";
  }

  const [selectedTab, setSelectedTab] = useState(getSelectedTab());

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
    navgiate("/chat" + newValue);
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      orientation="vertical"
      variant="scrollable"
      sx={{
        borderRight: 1,
        borderColor: "divider",
        backgroundColor: (theme) => theme.palette.background.default,
        ".MuiButtonBase-root": {
          minWidth: 50,
          width: 50,
        },
      }}
    >
      <Tab
        icon={<HomeIcon />}
        iconPosition="start"
        sx={{ alignItems: "flex-start" }}
        value="/"
      />
      <Tab
        icon={<PeopleIcon />}
        iconPosition="start"
        sx={{ alignItems: "flex-start" }}
        value="/user"
      />
      <Tab
        icon={<SettingsIcon />}
        iconPosition="start"
        sx={{ alignItems: "flex-start" }}
        value="setting"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: 8,
          left: 0,
        }}
      >
        <IconButton onClick={toggleDarkMode}>
          {darkMode ? <DarkModeOutlinedIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Tabs>
  );
};

export default NavBar;
