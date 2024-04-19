import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useCurrentUser } from "../libs/useCurrentUser";
import { Grid } from "@mui/material";

export const PrivateRoute = ({children}: { children: React.ReactNode }) => {
    const {auth} = useCurrentUser();

    if (auth.isLoading) {
        return (
            <Grid container>
                <CircularProgress/>
            </Grid>
        );
    }

    if (!auth.isAuthenticated) {
        auth.signinRedirect();
    }

    return children;
};

export default PrivateRoute;
