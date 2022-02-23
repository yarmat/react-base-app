import React, {FC} from 'react';
import {Button, Space, Table} from "antd";
import ITask from "../models/ITask";
import {ColumnsType} from "antd/es/table";
import {FilterValue, TablePaginationConfig} from "antd/lib/table/interface";
import {TaskSort} from "../api/task";

interface TaskTableProps {
    isLoading: boolean,
    tasks: ITask[],
    pagination: TablePaginationConfig,
    onTableChange: (pagination: TablePaginationConfig, sort: TaskSort[]) => void,
    onEditClicked: (task: ITask) => void,
    onDeleteClicked: (task: ITask) => void
}

const TaskTable: FC<TaskTableProps> = (
    {
        isLoading,
        tasks,
        pagination,
        onTableChange,
        onEditClicked,
        onDeleteClicked
    }) => {

    const handleTableChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: any
    ): void => {
        const _sort: TaskSort[] = []
        if (Array.isArray(sorter)) {
            sorter.forEach(s => {
                if (s.order) {
                    _sort.push({
                        name: s.field,
                        order: s.order
                    } as TaskSort)
                }
            });
        } else {
            if (sorter.order) {
                _sort.push({
                    name: sorter.field,
                    order: sorter.order
                } as TaskSort)
            }
        }

        onTableChange(
            pagination as TablePaginationConfig,
            _sort
        );
    };

    const columns: ColumnsType<ITask> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: '90%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, task) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => onEditClicked(task)} size="small">
                        Edit
                    </Button>
                    <Button type="primary" onClick={() => onDeleteClicked(task)} danger size="small">
                        Delete
                    </Button>
                </Space>
            ),
        }
    ];

    return (
        <Table
            columns={columns}
            rowKey={task => task.id}
            dataSource={tasks}
            pagination={pagination}
            loading={isLoading}
            onChange={handleTableChange}
        />
    );
};

export default TaskTable;
