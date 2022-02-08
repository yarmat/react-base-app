import React from "react";
import {routes as publicRoutes} from "./public";
import {routes as authRoutes} from "./auth";
import {routes as dashboardRoutes} from "./dashboard";

export interface IRoute {
    path?: string,
    element: React.ReactNode,
    children?: IRoute[]
}

export const routes = (isAuth: boolean): IRoute[] => {
    return [
        ...publicRoutes,
        ...authRoutes(isAuth),
        ...dashboardRoutes(isAuth)
    ]
}
