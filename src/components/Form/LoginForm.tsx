import React, {FC, useState} from 'react';
import {Form, Input, Button, Alert} from "antd";
import {required} from "../../utils/rules";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const LoginForm: FC = () => {
    const {isLoading, error} = useTypedSelector(state => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {loginActionCreator} = useActions();
    const submitForm = () => loginActionCreator(username, password);

    return (
        <>
            {error && <Alert style={{marginBottom: 15}} message={error} type="error" />}
            <Form
                layout="vertical"
                onFinish={submitForm}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[required('Please input your username!')]}
                >
                    <Input value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[required('Please input your password!')]}
                >
                    <Input.Password onChange={e => setPassword(e.target.value)} />
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
