import React, {FC} from 'react';
import {Card} from "antd";
import {Link} from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import {AuthRouteNames} from "../../router/auth";

const Login: FC = () => {
    return (
        <Card
            title="Login"
            bordered
            extra={<Link to={AuthRouteNames.REGISTER}>Register</Link>}
        >
            <LoginForm />
        </Card>
    );
};

export default Login;
