import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import appRoutes from "../../routes/appRoutes.tsx";
import SidebarItemCollapse from "./SidebarItemCollapse.tsx";
import SidebarItem from "./SidebarItem.tsx";
import {secondaryListItems} from "../../layouts/listItems.tsx";
import {Drawer} from "./styles";
import React, {useState} from "react";

import {CustomDrawerProps} from "../../types/customDrawerProps.ts"
import assets from "../../assets/index.ts";

const CustomDrawer: React.FC<CustomDrawerProps> = ({toggleDrawer, isOpen, theme}) => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);

    const handleItemClick = (path: string) => {
        setSelectedPath(path);
    };

    return (
        <Drawer variant="permanent" open={isOpen} theme={theme}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: [1],
                }}
            >
                <img alt={"logo"} src={assets.images.logo}
                     width={40}
                     height={40}
                />
                <img src={assets.images.logo2} alt={"logo norsys"} width={160}
                     height={30}/>
          
            </Toolbar>
            <Divider/>
            <List component="nav">
                {appRoutes.map((route, index) =>
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
                <Divider sx={{my: 0.4}}/>
                {secondaryListItems}
            </List>
        </Drawer>
    );
}
export default CustomDrawer;
