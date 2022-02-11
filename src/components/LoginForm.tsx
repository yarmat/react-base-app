import React, {FC} from 'react';
import {Form, Input, Button, Alert} from "antd";
import {required} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";
import {useInput} from '../hooks/useInput';

const LoginForm: FC = () => {
    const {isLoading, error} = useTypedSelector(state => state.auth);
    const {login} = useActions();

    const usernameInput = useInput();
    const passwordInput = useInput();

    const onSubmit = () => login(usernameInput.value, passwordInput.value);

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
                    label="Password"
                    name="password"
                    rules={[required('Please input your password!')]}
                >
                    <Input.Password {...passwordInput} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;
