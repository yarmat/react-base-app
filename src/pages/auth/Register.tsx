import React, {FC} from 'react';
import {Button, Card} from "antd";
import RegisterForm from "../../components/RegisterForm";
import {Link} from "react-router-dom";
import {AuthRouteNames} from "../../router/auth";

const Register: FC = () => {
    return (
        <Card title="Register">
            <RegisterForm />
            <Button type="link" block>
                <Link to={AuthRouteNames.LOGIN}>Login</Link>
            </Button>
        </Card>
    );
};

export default Register;
