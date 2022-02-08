import React from "react";
import {IRoute} from "./index";
import {Navigate} from "react-router-dom";
import {AuthRouteNames} from "./auth";

const Layout = React.lazy(() => import("../pages/dashboard/Layout"));
const Task = React.lazy(() => import("../pages/dashboard/Task"));


export enum DashboardRouteNames {
    TASK = '/dashboard/task',
}

export const routes = (isAuth: boolean): IRoute[] => [
    {
        element: isAuth ? <Layout /> : <Navigate to={AuthRouteNames.LOGIN} />,
        children: [
            { path: DashboardRouteNames.TASK, element: <Task /> },
        ]
    }
]
