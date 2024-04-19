import { RouteType } from "./routeConfigType.ts";

export interface SidebarProps {
  item: RouteType;
  selectedPath: string | null;
  handleItemClick: (path: string) => void;
}
