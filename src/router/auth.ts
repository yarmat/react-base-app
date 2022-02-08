import React from "react";
import {IRoute} from "./index";

const Layout = React.lazy(() => import("../pages/auth/Layout"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const Register = React.lazy(() => import("../pages/auth/Register"));

export enum AuthRouteNames {
    LOGIN = '/auth/login',
    REGISTER = '/auth/register'
}

export const routes: IRoute[] = [
    {
        element: Layout,
        children: [
            { path: AuthRouteNames.LOGIN, element: Login },
            { path: AuthRouteNames.REGISTER, element: Register },
        ]
    }
]
