import React, {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import {routes as generateRoutes} from "../router";

const AppRouter: FC = () => {
    const isAuth = true;

    const routes = generateRoutes(isAuth);

    return (
        <Routes>
            {routes.map(route => {
                return <Route key={route.path} path={route.path && route.path} element={route.element}>
                    {route.children && route.children.map(routeChildren => {
                        return <Route key={routeChildren.path} path={routeChildren.path} element={routeChildren.element} />
                    })}
                </Route>;
            })}
        </Routes>
    );
};

export default AppRouter;
