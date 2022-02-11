import React from "react";
import {IRoute} from "./index";
import { Navigate} from 'react-router-dom';
import {DashboardRouteNames} from "./dashboard";

const Layout = React.lazy(() => import("../pages/Auth/Layout"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));

export enum AuthRouteNames {
    LOGIN = '/auth/login',
    REGISTER = '/auth/register'
}

export const routes = (isAuth: boolean): IRoute[] => [
    {
        element: isAuth ? <Navigate to={DashboardRouteNames.TASK} /> : <Layout />,
        children: [
            { path: AuthRouteNames.LOGIN, element: <Login /> },
            { path: AuthRouteNames.REGISTER, element: <Register /> },
        ]
    }
]
