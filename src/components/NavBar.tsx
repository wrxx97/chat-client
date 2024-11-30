import React, { useState, ReactNode } from "react";
import { Tabs, Tab, Box, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useAppStore } from "../store";
import { useNavigate } from "react-router";

const NavBar = ({ children }: { children: ReactNode }) => {
  const navgiate = useNavigate();
  const darkMode = useAppStore((state) => state.darkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 3) {
      navgiate("/");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
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
        />
        <Tab
          icon={<InfoIcon />}
          iconPosition="start"
          sx={{ alignItems: "flex-start" }}
        />
        <Tab
          icon={<SettingsIcon />}
          iconPosition="start"
          sx={{ alignItems: "flex-start" }}
        />
        <Tab
          icon={<HomeIcon />}
          iconPosition="start"
          sx={{ alignItems: "flex-start" }}
        />
        <IconButton
          onClick={toggleDarkMode}
          sx={{
            position: "absolute",
            bottom: 8,
            left: 0,
          }}
        >
          {darkMode ? <DarkModeOutlinedIcon /> : <LightModeIcon />}
        </IconButton>
      </Tabs>
      {children}
    </Box>
  );
};

export default NavBar;
