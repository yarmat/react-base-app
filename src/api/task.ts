import axios from "axios";
import {AxiosResponse} from "axios";
import ITask from "../models/ITask";
import {TaskStateSort} from "../store/reducers/task/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


export interface TaskStoreApiPayload {
    name: string,
    user_id: number
}

export interface TaskUpdateApiPayload {
    id: number,
    name: string,
    user_id: number
}

export interface TaskGetByUserIdParams {
    userId: number,
    page: number,
    limit: number,
    sortOrder: TaskStateSort[] | []
}


export const taskAPI = createApi({
    reducerPath: 'tasks',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: (build) => ({
        getByUserId: build.query<ITask[], TaskGetByUserIdParams>({
            query: ({
                        userId,
                        page = 1,
                        limit = 10,
                        sortOrder = []
                    }: TaskGetByUserIdParams) => ({
                url: 'tasks',
                params: () => {
                    let baseParams = {
                        _page: page,
                        _limit: limit,
                        userId: userId,
                    };

                    let sortOrderParams = {};

                    if (sortOrder.length > 0) {
                        const sort = sortOrder.map(i => i.name).join(',');
                        const order = sortOrder.map(i => i.order === 'ascend' ? 'asc' : 'desc').join(',');
                        sortOrderParams = {
                            _sort: sort,
                            _order: order
                        }
                    }

                    return {...baseParams, ...sortOrderParams};
                }
            })
        })
    })
})

export const { useGetByUserIdQuery } = taskAPI;

export default class TaskApiService {
    static async getByUserId(
        userId: number,
        page: number = 1,
        limit: number = 10,
        sortOrder: TaskStateSort[] | [] = []
    ): Promise<AxiosResponse> {
        let sortOrderString = '';

        if (sortOrder.length > 0) {
            const sort = sortOrder.map(i => i.name).join(',');
            const order = sortOrder.map(i => i.order === 'ascend' ? 'asc' : 'desc').join(',');
            sortOrderString = `&_sort=${sort}&_order=${order}`;
        }

        return await axios.get<ITask[]>(`http://localhost:3001/tasks?_page=${page}&_limit=${limit}${sortOrderString}&user_id=${userId}`);
    }

    static async store(task: TaskStoreApiPayload): Promise<ITask> {
        const response = await axios.post<ITask>('http://localhost:3001/tasks', {
            name: task.name,
            user_id: task.user_id
        });

        return response.data;
    }

    static async update(task: TaskUpdateApiPayload): Promise<AxiosResponse> {
        return await axios.put(`http://localhost:3001/tasks/${task.id}`, {
            name: task.name,
            user_id: task.user_id
        });
    }

    static async delete(id: number): Promise<AxiosResponse> {
        return await axios.delete(`http://localhost:3001/tasks/${id}`);
    }
}
