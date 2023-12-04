import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { useLocation } from "react-router-dom";
import { List } from "@mui/material";

export const ListComponent = () => {
  const location = useLocation();

  const isActive = (path) => {
    return path === location.pathname;
  };

  return (
    <List component="nav">
      <ListItemButton LinkComponent={"a"} href="/" selected={isActive("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton LinkComponent={"a"} href="/users" selected={isActive("/users")}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </List>
  );
};
