import ITask from "../../../models/ITask";

export interface TaskStatePagination {
    current: number,
    pageSize: number,
    total: number
}

export interface TaskStateSort {
    name: string,
    order: 'ascend' | 'descend'
}

export interface TaskState {
    isLoading: boolean,
    error: string,
    tasks: ITask[],
    pagination: TaskStatePagination,
    sort: TaskStateSort[]
}

export enum TaskActionEnum {
    SET_TASKS = 'SET_TASKS',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR',
    UPDATE_TASK = 'UPDATE_TASK',
    DELETE_TASK = 'DELETE_TASK'
}

export interface SetTasksActionPayload {
    tasks: ITask[],
    pagination: TaskStatePagination,
    sort: TaskStateSort[]
}

export interface SetTasksAction {
    type: TaskActionEnum.SET_TASKS,
    payload: SetTasksActionPayload
}

export interface SetIsLoadingAction {
    type: TaskActionEnum.SET_IS_LOADING,
    payload: boolean
}

export interface SetErrorAction {
    type: TaskActionEnum.SET_ERROR,
    payload: string
}

export interface UpdateAction {
    type: TaskActionEnum.UPDATE_TASK,
    payload: ITask
}

export interface DeleteAction {
    type: TaskActionEnum.DELETE_TASK,
    payload: ITask
}

export type TaskAction = SetTasksAction | SetIsLoadingAction | SetErrorAction | DeleteAction | UpdateAction;
