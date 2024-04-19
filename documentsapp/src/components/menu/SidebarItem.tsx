import {ListItemButton, ListItemIcon, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import {SidebarProps} from "../../types/routePropsSidebar.ts";
import Typography from "@mui/material/Typography";

const SidebarItem = ({item, selectedPath, handleItemClick}: SidebarProps) => {
    const isActive = selectedPath === item.path;
    const theme=useTheme();

    return item.sidebarProps && item.path ? (
        <ListItemButton
            component={Link}
            to={item.path}
            onClick={() => handleItemClick(item.path || "")}
            selected={isActive}
            sx={{
                paddingY: "8px",
                paddingX: "24px",
            }}
        >
            <ListItemIcon sx={{ color: isActive ? theme.palette.primary.main : 'dimgray' }}>
                {item.sidebarProps.icon && item.sidebarProps.icon}
            </ListItemIcon>
            <Typography variant={"h5"}
                        color={isActive ? "primary" : "dimgray"}>{item.sidebarProps.displayText}</Typography>

        </ListItemButton>
    ) : null;
};

export default SidebarItem;
