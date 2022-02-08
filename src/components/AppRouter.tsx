import React, {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import {routes as publicRoutes} from '../router/public';
import {routes as authRoutes} from '../router/auth';
import {routes as dashboardRoutes} from '../router/dashboard';

const AppRouter: FC = () => {
    let routes = publicRoutes;

    const isAuth = false;

    routes = isAuth
        ? [...routes, ...dashboardRoutes]
        : [...routes, ...authRoutes]

    return (
        <Routes>
            {routes.map(route => {
                return <Route key={route.path} path={route.path && route.path} element={<route.element/>}>
                    {route.children && route.children.map(routeChildren => {
                        return <Route key={routeChildren.path} path={routeChildren.path} element={<routeChildren.element />} />
                    })}
                </Route>;
            })}
        </Routes>
    );
};

export default AppRouter;
