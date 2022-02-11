import React, {FC} from 'react';
import {Form, Input, Button, Alert} from "antd";
import {confirmed, required} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {useInput} from '../hooks/useInput';
import {RegisterData} from "../store/reducers/auth/types";

const RegisterForm: FC = () => {
    const {isLoading, error} = useTypedSelector(state => state.auth);
    const {register} = useActions();

    const usernameInput = useInput();
    const firstNameInput = useInput();
    const lastNameInput = useInput();
    const passwordInput = useInput();
    const passwordConfirmationInput = useInput();

    const onSubmit = () => register({
        username: usernameInput.value,
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        password: passwordInput.value
    } as RegisterData);

    return (
        <>
            {error && <Alert style={{marginBottom: 15}} message={error} type="error" />}
            <Form
                layout="vertical"
                onFinish={onSubmit}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[required('Please input your username!')]}
                >
                    <Input {...usernameInput} />
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[required('Please input your first name!')]}
                >
                    <Input {...firstNameInput} />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[required('Please input your last name!')]}
                >
                    <Input {...lastNameInput} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        required('Please input your password!'),
                        confirmed(passwordConfirmationInput.value, 'Password should be confirmed.')
                    ]}
                >
                    <Input.Password {...passwordInput} />
                </Form.Item>
                <Form.Item
                    label="Password Confirmation"
                    name="password_confirmation"
                    rules={[required('Please input your password confirmation!')]}
                >
                    <Input.Password {...passwordConfirmationInput} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterForm;
