import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import {LoginPage} from "./pages/login/LoginPage";
import appRoutes from "./routes/appRoutes";
import React from "react";
import LayoutWrapper from "./layouts/LayoutWrapper.tsx";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./routes/PrivateRoute.tsx";

const routerJSX = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<LayoutWrapper/>} errorElement={<ErrorPage/>}>
            <Route errorElement={<ErrorPage/>}>
                {appRoutes.map((route, index) => (
                    <React.Fragment key={index}>
                        <Route
                            path={route.path}
                            element={<PrivateRoute>{route.element}</PrivateRoute>}
                        />
                        {route.child &&
                            route.child.map((childRoute, childIndex) => (
                                <Route
                                    key={childIndex}
                                    path={childRoute.path}
                                    element={<PrivateRoute>{childRoute.element}</PrivateRoute>}
                                />
                            ))}
                    </React.Fragment>
                ))}
            </Route>
            <Route path="login" element={<LoginPage/>}/>
        </Route>
    )
);

function App() {
    return <RouterProvider router={routerJSX}/>;
}

export default App;
