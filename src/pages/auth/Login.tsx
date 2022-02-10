import React, {FC} from 'react';
import {Card} from "antd";
import LoginForm from "../../components/Form/LoginForm";

const Login: FC = () => {
    return (
        <Card title="Login">
            <LoginForm />
        </Card>
    );
};

export default Login;
