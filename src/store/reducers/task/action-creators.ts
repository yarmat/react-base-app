import ITask from "../../../models/ITask";
import {
    SetErrorAction,
    SetIsLoadingAction,
    SetTasksAction,
    SetTasksActionPayload,
    TaskActionEnum,
    TaskStatePagination,
    TaskStateSort,
    UpdateAction
} from "./types";
import {AppDispatch} from "../../index";
import TaskApiService from "../../../api/task";
import {AxiosResponse} from "axios";


export const setTasks = (payload: SetTasksActionPayload): SetTasksAction => ({type: TaskActionEnum.SET_TASKS, payload});
export const setIsLoadingTasks = (isLoading: boolean): SetIsLoadingAction => ({type: TaskActionEnum.SET_IS_LOADING, payload: isLoading});
export const setErrorTasks = (error: string): SetErrorAction => ({type: TaskActionEnum.SET_ERROR, payload: error});
export const _updateTask = (task: ITask): UpdateAction => ({type: TaskActionEnum.UPDATE_TASK, payload: task});

export const fetchTasksByUserID = (
    userId: number,
    pagination: TaskStatePagination,
    sort: TaskStateSort[]
    // @ts-ignore
) : Promise<AxiosResponse> => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingTasks(true));

        let current = pagination.current;
        let response = await TaskApiService.getByUserId(userId, current, pagination.pageSize, sort);

        while(current > 1 && response.data.length === 0) {
            current--;
            response = await TaskApiService.getByUserId(userId, current, pagination.pageSize, sort);
        }

        const total = response.headers['x-total-count'] as unknown as number;

        dispatch(setTasks({
            tasks: response.data,
            pagination: {...pagination, current, total},
            sort: sort
        }));

        return response;
    } catch (e: any) {
        dispatch(setErrorTasks(e.message));
    } finally {
        dispatch(setIsLoadingTasks(false));
    }
}

export const storeTask = (task: ITask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingTasks(true));

        await TaskApiService.store({
            name: task.name,
            user_id: task.user_id
        });
    } catch (e: any) {
        dispatch(setErrorTasks(e.message));
    } finally {
        dispatch(setIsLoadingTasks(false));
    }
}

export const updateTask = (task: ITask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingTasks(true));

        await TaskApiService.update({
            id: task.id,
            name: task.name,
            user_id: task.user_id
        });
        dispatch(_updateTask(task));
    } catch (e: any) {
        dispatch(setErrorTasks(e.message));
    } finally {
        dispatch(setIsLoadingTasks(false));
    }
}

export const deleteTask = (task: ITask) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingTasks(true));

        await TaskApiService.delete(task.id);
    } catch (e: any) {
        dispatch(setErrorTasks(e.message));
    } finally {
        dispatch(setIsLoadingTasks(false));
    }
}
