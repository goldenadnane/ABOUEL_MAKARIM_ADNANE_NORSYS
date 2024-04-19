import { ReactElement } from "react";

export type RouteType = {
  element: ReactElement;
  allowedRoles: string[]; 
  item?: RouteType[];
  state: string;
  index?: boolean;
  isChild?: boolean;
  path?: string;
  child?: RouteType[];
  sidebarProps?: {
    displayText: string;
    icon?: ReactElement;
  };
};
