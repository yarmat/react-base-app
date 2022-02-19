import React, {FC, useEffect, useState} from 'react';
import {Card, Alert, Button} from "antd";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import TaskTable from "../../components/TaskTable";
import ITask from "../../models/ITask";
import TaskCreateModal from "../../components/TaskCreateModal";
import TaskEditModal from "../../components/TaskEditModal";

const Task:FC = () => {
    const {
        pagination,
        sort,
        error
    } = useTypedSelector(state => state.task);

    const {user} = useTypedSelector(state => state.auth)

    const {fetchTasksByUserID, storeTask, deleteTask, updateTask} = useActions();

    const [isVisibleTaskCreateModal, setIsVisibleTaskCreateModal] = useState(false);
    const [isVisibleTaskEditModal, setIsVisibleTaskEditModal] = useState(false);
    const [activeTask, setActiveTask] = useState<ITask>();

    const fetchTasks = async (p = pagination, s = sort) => {
        return await fetchTasksByUserID(user.id, p, s);
    }

    useEffect(() => {
        fetchTasks();
    }, []);

    const editClicked = (task: ITask) => {
        setActiveTask(task);
        setIsVisibleTaskEditModal(true);
    }

    const deleteClicked = async (task: ITask) => {
        if (window.confirm('Are you sure?')) {
            await deleteTask(task);
            await fetchTasks();
        }
    }

    const onCreateSubmit = async (name: string) => {
        await storeTask({
            id: 1,
            name: name,
            user_id: user.id
        });
        await fetchTasks();
    };

    const onEditSubmit = async (name: string) => {
        await updateTask({
            ...activeTask,
            name: name
        } as ITask);
        await fetchTasks();
    };

    return (
        <Card title="Tasks" extra={
            <Button type="primary" onClick={() => setIsVisibleTaskCreateModal(!isVisibleTaskCreateModal)}>
                Create Task
            </Button>
        }>
            {error && <Alert style={{marginBottom: 15}} message={error} type="error" />}

            <TaskTable
                onTableChange={fetchTasks}
                onEditClicked={editClicked}
                onDeleteClicked={deleteClicked}
            />

            <TaskCreateModal
                isVisible={isVisibleTaskCreateModal}
                onSubmit={onCreateSubmit}
                onVisibleChanged={(isVisible) => setIsVisibleTaskCreateModal(isVisible)}
            />

            {activeTask && <TaskEditModal
                task={activeTask}
                isVisible={isVisibleTaskEditModal}
                onSubmit={onEditSubmit}
                onVisibleChanged={(isVisible) => setIsVisibleTaskEditModal(isVisible)}
            />}

        </Card>
    );
};

export default Task;
