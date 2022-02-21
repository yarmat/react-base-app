import ITask from "../../../models/ITask";
import {
    TaskStatePagination,
    TaskStateSort
} from "./types";
import {AppDispatch} from "../../index";
import TaskApiService from "../../../api/task";
import {AxiosResponse} from "axios";


import {taskSlice} from "./index";

export const fetchTasksByUserID = (
    userId: number,
    pagination: TaskStatePagination,
    sort: TaskStateSort[]
    // @ts-ignore
) : Promise<AxiosResponse> => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.setIsLoading(true));

        let current = pagination.current;
        let response = await TaskApiService.getByUserId(userId, current, pagination.pageSize, sort);

        while(current > 1 && response.data.length === 0) {
            current--;
            response = await TaskApiService.getByUserId(userId, current, pagination.pageSize, sort);
        }

        const total = response.headers['x-total-count'] as unknown as number;

        dispatch(taskSlice.actions.setTasks({
            tasks: response.data,
            pagination: {...pagination, current, total},
            sort: sort
        }));

        return response;
    } catch (e: any) {
        dispatch(taskSlice.actions.setError(e.message));
    } finally {
        dispatch(taskSlice.actions.setIsLoading(false));
    }
}

export const storeTask = (task: ITask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.setIsLoading(true));

        await TaskApiService.store({
            name: task.name,
            user_id: task.user_id
        });
    } catch (e: any) {
        dispatch(taskSlice.actions.setError(e.message));
    } finally {
        dispatch(taskSlice.actions.setIsLoading(false));
    }
}

export const updateTask = (task: ITask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.setIsLoading(true));

        await TaskApiService.update({
            id: task.id,
            name: task.name,
            user_id: task.user_id
        });

        dispatch(taskSlice.actions.updateTask(task));
    } catch (e: any) {
        dispatch(taskSlice.actions.setError(e.message));
    } finally {
        dispatch(taskSlice.actions.setIsLoading(false));
    }
}

export const deleteTask = (task: ITask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(taskSlice.actions.setIsLoading(true));

        await TaskApiService.delete(task.id);
    } catch (e: any) {
        dispatch(taskSlice.actions.setError(e.message));
    } finally {
        dispatch(taskSlice.actions.setIsLoading(false));
    }
}
