import ITask from "../../../models/ITask";

export interface TaskState {
    isLoading: boolean,
    error: string,
    tasks: ITask[],
    pagination: TaskStatePagination,
    sort: TaskStateSort[]
}

export interface TaskStateSort {
    name: string,
    order: 'ascend' | 'descend'
}

export interface TaskStatePagination {
    current: number,
    pageSize: number,
    total: number
}

export interface SetTasksActionPayload {
    tasks: ITask[],
    pagination: TaskStatePagination,
    sort: TaskStateSort[]
}
