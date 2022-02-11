import React, {FC} from 'react';
import {Card, Button} from "antd";
import {Link} from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import {AuthRouteNames} from "../../router/auth";

const Login: FC = () => {
    return (
        <Card title="Login">
            <LoginForm />
            <Button type="link" block>
                <Link to={AuthRouteNames.REGISTER}>Register</Link>
            </Button>
        </Card>
    );
};

export default Login;
