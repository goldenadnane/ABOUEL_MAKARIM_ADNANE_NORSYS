import {useState} from "react";
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, useTheme,
} from "@mui/material";
import {SidebarProps} from "../../types/routePropsSidebar.ts";
import SidebarItem from "./SidebarItem.tsx";
import Typography from "@mui/material/Typography";
import React from "react";

const SidebarItemCollapse = ({
                                 item,
                                 selectedPath,
                                 handleItemClick,
                             }: SidebarProps) => {
    const [open, setOpen] = useState(false);
    const theme=useTheme();

    return item.sidebarProps ? (
            <>
                <ListItemButton
                    onClick={() => {
                        setOpen(!open);
                        handleItemClick(item.path || "");
                    }}
                    sx={{
                        paddingY: "8px",
                        paddingX: "24px",
                    }}
                    selected={selectedPath === item.path}
                >
                    <ListItemIcon  sx={{ color: selectedPath === item.path ? theme.palette.primary.main : "dimgray" }}>
                        {item.sidebarProps.icon && item.sidebarProps.icon}
                    </ListItemIcon>
                    <ListItemText disableTypography={false}
                                  primary={<Typography variant={"h6"}
                                                       color={selectedPath === item.path ? "primary" : "dimgray"}>{item.sidebarProps.displayText}</Typography>}

                    />
                  
                </ListItemButton>
                <Collapse in={open} timeout="auto">
                    <List>
                        {item.child?.map((route, index) =>
                            route.sidebarProps ? (
                                route.child ? (
                                    <SidebarItemCollapse
                                        item={route}
                                        key={index}
                                        selectedPath={selectedPath}
                                        handleItemClick={handleItemClick}
                                    />
                                ) : (
                                    <SidebarItem
                                        item={route}
                                        key={index}
                                        selectedPath={selectedPath}
                                        handleItemClick={handleItemClick}
                                    />
                                )
                            ) : null
                        )}
                    </List>
                </Collapse>
            </>
        ) :
        null;
};

export default SidebarItemCollapse;
