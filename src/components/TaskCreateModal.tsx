import React, {FC} from 'react';
import {Alert, Button, Form, Input, Modal} from "antd";
import {required} from "../utils/rules";
import {useInput} from "../hooks/useInput";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface TaskCreateModalProps {
    isVisible: boolean
    onSubmit: (name: string) => void,
    onVisibleChanged: (isVisible: boolean) => void
}

const TaskCreateModal: FC<TaskCreateModalProps> = ({onSubmit, isVisible = false, onVisibleChanged}) => {
    const {
        error,
        isLoading,
    } = useTypedSelector(state => state.task);

    const nameInput = useInput();
    const toggleModal = () => onVisibleChanged(!isVisible);
    const [form] = Form.useForm();

    const onFinish = () => {
        form.resetFields();
        toggleModal();
        onSubmit(nameInput.value);
    }

    return (
        <Modal
            title="Create Task"
            footer={false}
            visible={isVisible}
            onCancel={toggleModal}>

            {error && <Alert style={{marginBottom: 15}} message={error} type="error" />}

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
                    <Input {...nameInput} />
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

export default TaskCreateModal;
