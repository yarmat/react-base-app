import React, {FC, useEffect, useState} from 'react';
import {Alert, Button, Form, Input, Modal} from "antd";
import {required} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import ITask from "../models/ITask";

interface TaskEditModalProps {
    task: ITask,
    isVisible: boolean
    onSubmit: (name: string) => void,
    onVisibleChanged: (isVisible: boolean) => void
}

const TaskEditModal: FC<TaskEditModalProps> = (
    {
        task,
        onSubmit,
        onVisibleChanged,
        isVisible = false
    }) => {
    const {
        error,
        isLoading,
    } = useTypedSelector(state => state.task);

    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const toggleModal = () => onVisibleChanged(!isVisible);

    useEffect(() => {
        form.setFieldsValue({name: task.name});
        setName(task.name);
    }, [task]);

    const onFinish = () => {
        toggleModal();
        onSubmit(name);
    }

    return (
        <Modal
            title={`Edit Task ${task.name}`}
            footer={false}
            visible={isVisible}
            onCancel={toggleModal}>

            {error && <Alert style={{marginBottom: 15}} message={error} type="error"/>}

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[required()]}
                >
                    <Input value={name} onChange={e => setName(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskEditModal;
