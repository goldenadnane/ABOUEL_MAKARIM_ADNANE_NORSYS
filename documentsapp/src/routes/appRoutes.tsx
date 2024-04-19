import {RouteType} from "../types/routeConfigType.ts";
import {Home} from "../pages/home/Home";

import DisplayDocuments from "../pages/documents/DisplayDocuments.tsx";
import AddDocument from "../pages/documents/AddDocument.tsx";
import UpdateDocument from "../pages/documents/UpdateDocument.tsx";
import UpdateUser from "../pages/users/UpdateUser.tsx";
import DisplayUsers from "../pages/users/DisplayUsers.tsx";
import AddUser from "../pages/users/AddUser.tsx";
import { Route } from "react-router-dom";

const appRoutes: RouteType[] = [
   {
        path: "/",
        index: true,
        element: <Home/>,
        state: "home",
        isChild: false,
        allowedRoles: [],
    },
    
    {
        path: "/documents",
        element: <DisplayDocuments/>,
        state: "Documents",
        sidebarProps: {
            displayText: "Documents",
            
        },
        isChild: false,
        allowedRoles: [],
    },
  
    {
        path: "/documents/add",
        element: <AddDocument/>,
        state: "AddDocuments",
        isChild: false,
        allowedRoles: [],
    },
  
    {
        path: "/documents/update/:documentId",
        element: <UpdateDocument/>,
        state: "UpdateDocuments",
        isChild: false,
        allowedRoles: [],
    },
    {
        path: "/users",
        element: <DisplayUsers/>,
        state: "Users",
        sidebarProps: {
            displayText: "Users",  
        },
        isChild: false,
        allowedRoles: [],
    },
    {
        path: "/users/add",
        element: <AddUser/>,
        state: "AddUsers",
        isChild: false,
        allowedRoles: [],
    },

    {
        path: "/users/update/:userId",
        element: <UpdateUser/>,
        state: "UpdateUsers",
        isChild: false,
        allowedRoles: [],
    },
    
];

export default appRoutes;
