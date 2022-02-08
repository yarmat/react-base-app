import React from "react";
import {IRoute} from "./index";

import NotFound from "../pages/NotFound";
const Main = React.lazy(() => import("../pages/Main"));

export enum PublicRouteNames {
    MAIN = '/',
}

export const routes: IRoute[] = [
    {
        path: PublicRouteNames.MAIN,
        element: <Main />
    },
    {
        path: '*',
        element: <NotFound />
    }
]
