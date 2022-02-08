import React from "react";
import {IRoute} from "./index";

const Layout = React.lazy(() => import("../pages/dashboard/Layout"));
const Task = React.lazy(() => import("../pages/dashboard/Task"));


export enum DashboardRouteNames {
    TASK = '/dashboard/Task',
}

export const routes: IRoute[] = [
    {
        element: Layout,
        children: [
            { path: DashboardRouteNames.TASK, element: Task },
        ]
    }
]
