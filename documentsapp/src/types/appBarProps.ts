import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
export interface CustomAppBarProps {
    toggleDrawer: () => void;
    isOpen: boolean;
    theme: any;
    auth: any;

}