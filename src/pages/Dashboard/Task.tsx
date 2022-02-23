import React, {FC, useEffect, useState} from 'react';
import {Card, Alert, Button, TablePaginationConfig} from "antd";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import TaskTable from "../../components/TaskTable";
import ITask from "../../models/ITask";
import TaskCreateModal from "../../components/TaskCreateModal";
import TaskEditModal from "../../components/TaskEditModal";
import {TaskGetByUserIdParams, TaskSort, useGetByUserIdQuery} from "../../api/task";

const Task:FC = () => {
    const {user} = useTypedSelector(state => state.auth)

    const {storeTask, deleteTask, updateTask} = useActions();


    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0
    })

    const [sort, setSort] = useState<TaskSort[]>([]);

    const {data, isLoading, error} = useGetByUserIdQuery({
        userId: user.id,
        page: pagination.current,
        limit: pagination.pageSize,
        sortOrder: sort
    } as TaskGetByUserIdParams)

    const [isVisibleTaskCreateModal, setIsVisibleTaskCreateModal] = useState(false);
    const [isVisibleTaskEditModal, setIsVisibleTaskEditModal] = useState(false);
    const [activeTask, setActiveTask] = useState<ITask>();

    const onTableChange = (p = pagination, s = sort) => {
        setPagination(p);
        setSort(s);
    }

    const editClicked = (task: ITask) => {
        setActiveTask(task);
        setIsVisibleTaskEditModal(true);
    }

    const deleteClicked = async (task: ITask) => {
        if (window.confirm('Are you sure?')) {
            await deleteTask(task);
        }
    }

    const onCreateSubmit = async (name: string) => {
        await storeTask({
            id: 1,
            name: name,
            user_id: user.id
        });
    };

    const onEditSubmit = async (name: string) => {
        await updateTask({
            ...activeTask,
            name: name
        } as ITask);
    };

    return (
        <Card title="Tasks" extra={
            <Button type="primary" onClick={() => setIsVisibleTaskCreateModal(!isVisibleTaskCreateModal)}>
                Create Task
            </Button>
        }>
            {error && <Alert style={{marginBottom: 15}} message={error} type="error" />}

            {data && <TaskTable
                isLoading={isLoading}
                tasks={data}
                pagination={pagination}
                onTableChange={onTableChange}
                onEditClicked={editClicked}
                onDeleteClicked={deleteClicked}
            /> }

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
