import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {Outlet} from "react-router-dom";
import {useTheme} from "@mui/material";
import CustomAppBar from '../components/menu/CustomAppBar.tsx';
import Copyright from '../components/menu/Copyright.tsx';
import CustomDrawer from '../components/menu/CustomDrawer.tsx';
import {useCurrentUser} from "../libs/useCurrentUser.ts";

export default function LayoutWrapper() {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const {auth} = useCurrentUser();

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            {auth.isAuthenticated &&
                <CustomAppBar toggleDrawer={toggleDrawer} isOpen={open} theme={theme} auth={auth}/>}
            {auth.isAuthenticated && <CustomDrawer toggleDrawer={toggleDrawer} isOpen={open} theme={theme}/>}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                    <Outlet/>
                    <Copyright sx={{pt: 4}}/>
                </Container>
            </Box>
        </Box>
    );
}