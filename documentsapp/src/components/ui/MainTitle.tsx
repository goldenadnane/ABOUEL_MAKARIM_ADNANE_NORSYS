import Typography from "@mui/material/Typography";
import React from "react";
import {Box} from "@mui/material";

interface MainTitleProps {
    title: string;
}

export const MainTitle: React.FC<MainTitleProps> = ({title}) => {
    return (
        <Box margin={"20px"} alignItems={"center"}>
            <Typography variant={"h2"} align={"center"}>{title}</Typography>
        </Box>
    );
};