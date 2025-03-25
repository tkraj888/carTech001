import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Collapse,
} from "@mui/material";
import {
  HomeRounded as HomeIcon,
  AnalyticsRounded as AnalyticsIcon,
  PeopleRounded as PeopleIcon,
  AssignmentRounded as AssignmentIcon,
  BuildRounded as BuildIcon, 
  MiscellaneousServicesRounded as RepairIcon, 
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const mainListItems = [
  { text: "Dashboard", icon: <HomeIcon />, link: "/admin/dashboard" },
  { text: "Manage User", icon: <AnalyticsIcon />, link: "/admin/users" },
  {
    text: "Master",
    icon: <PeopleIcon />,
    subMenu: [
      { text: "Manage Service", icon: <BuildIcon />, link: "/admin/manage-service" },
      { text: "Manage Repair", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Manage Spares", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Manage Supplier", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Manage Customer", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Manage Notes", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Manage Terms & Conditions", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Spare Sale Stock", icon: <RepairIcon />, link: "/admin/manage-repair" },
    ],
  },
  { text: "Report",
     icon: <AssignmentIcon />,
     subMenu: [
      { text: "Job Sales Report", icon: <BuildIcon />, link: "/admin/manage-service" },
      { text: "Counter Sales Report", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Purchase Report", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Superwise/Technician Service Report", icon: <RepairIcon />, link: "/admin/manage-repair" },
      { text: "Vehicle History", icon: <RepairIcon />, link: "/admin/manage-repair" },
     ] },
  { text: "Account Report",
     icon: <AssignmentIcon />,
     subMenu: [
      { text: "Sale Account Report", icon: <BuildIcon />, link: "/admin/manage-service" },
      { text: "Purches Account Report", icon: <RepairIcon />, link: "/admin/manage-repair" },
     ] },
  { text: "Payment", icon: <AssignmentIcon />, subMenu: [
    { text: "Customer Payment", icon: <BuildIcon />, link: "/admin/manage-service" },
    { text: "Bank Deposit", icon: <RepairIcon />, link: "/admin/manage-repair" },
    { text: "Employee Payment", icon: <RepairIcon />, link: "/admin/manage-repair" },
  ] },
];

export default function MenuContent() {
  const location = useLocation(); 
  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null);;
  
  const handleToggle = (menuText: string) => {
    setOpenSubMenu((prev) => (prev === menuText ? null : menuText)); 
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
        
            {!item.subMenu ? (
              <ListItem disablePadding sx={{ display: "block" }}>
                <NavLink
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                >
                  <ListItemButton selected={location.pathname === item.link}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </NavLink>
              </ListItem>
            ) : (
             
              <>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton onClick={() => item.subMenu && handleToggle(item.text)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                    {openSubMenu ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>

            
                <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem, subIndex) => (
                      <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                        <NavLink
                          to={subItem.link}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            width: "100%",
                          }}
                        >
                          <ListItemButton selected={location.pathname === subItem.link}>
                           
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        </NavLink>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
