import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import assets from "../../assets/index.ts";
import MenuItem from "@mui/material/MenuItem";
import SearchAppBar from "./SearchAppBar.tsx";
import * as React from "react";
import {CustomAppBarProps} from "../../types/appBarProps.ts";
import {AppBar} from "./styles";

const settings = ["Mon compte", "Parametres", "Se déconnecter"];

const CustomAppBar: React.FC<CustomAppBarProps> = ({toggleDrawer, isOpen, theme, auth}) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        auth.signoutSilent();
        window.location.reload();
    };

    return (
        <AppBar position="absolute" open={isOpen} theme={theme} color={'inherit'}>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pl: '24px',
                }}
            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '24px',
                            ...(isOpen && {display: 'none'}),
                        }}
                    >
                       
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{
                            ...(isOpen && {display: 'none'}),
                        }}
                    >
                        <img
                            alt={"logo"}
                            src={assets.images.logo}
                            style={{width: "40px", height: "40px"}}
                        />
                    </Typography>
                    <SearchAppBar/>
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="error">
                        
                        </Badge>
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{mx: 2}}/>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginRight: 9,
                        }}
                    >
                        <Typography variant="h6">
                            THE KING
                        </Typography>
                        <Typography variant="subtitle2" color="info">
                            ABOUEL_MAKARIM_ADNANE
                        </Typography>
                    </div>
                    <Tooltip title="Open settings">
                        <IconButton
                            onClick={handleOpenUserMenu}
                        >
                            <Avatar src={assets.images.adnane}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: "45px"}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem
                                key={setting}
                                onClick={
                                    setting === "Se déconnecter"
                                        ? handleLogout
                                        : handleCloseUserMenu
                                }
                            >
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );

}
export default CustomAppBar;