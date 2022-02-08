import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {AuthRouteNames} from "../router/auth";
import {DashboardRouteNames} from "../router/dashboard";


const Main: FC = () => {
    return (
        <div>
            Main Page

            <Link to={DashboardRouteNames.TASK}>Dashboard</Link>
            <Link to={AuthRouteNames.LOGIN}>Login</Link>
            <Link to={AuthRouteNames.REGISTER}>Register</Link>
        </div>
    );
};

export default Main;
