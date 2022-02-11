import React, {FC} from 'react';
import {Card} from "antd";
import RegisterForm from "../../components/RegisterForm";
import {Link} from "react-router-dom";
import {AuthRouteNames} from "../../router/auth";

const Register: FC = () => {
    return (
        <Card
            title="Register"
            bordered
            extra={<Link to={AuthRouteNames.LOGIN}>Login</Link>}
        >
            <RegisterForm />
        </Card>
    );
};

export default Register;
