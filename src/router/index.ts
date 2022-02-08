import React from "react";

export interface IRoute {
    path?: string,
    element: React.ComponentType,
    children?: IRoute[]
}
