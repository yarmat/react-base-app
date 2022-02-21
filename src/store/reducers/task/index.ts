import {SetTasksActionPayload, TaskState} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import ITask from "../../../models/ITask";

const initialState: TaskState = {
    isLoading: false,
    error: '',
    tasks: [],
    pagination: {
        current: 1,
        pageSize: 10,
        total: 0
    },
    sort: []
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>) {
            if (action.payload) {
                state.error = '';
            }

            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
        setTasks(state, action: PayloadAction<SetTasksActionPayload>) {
            state.tasks = action.payload.tasks;
            state.pagination = action.payload.pagination;
            state.sort = action.payload.sort;
        },
        updateTask(state, action: PayloadAction<ITask>) {
            state.tasks = state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
        },
        deleteTask(state, action: PayloadAction<ITask>) {
            state.tasks = state.tasks.filter(t => t.id !== action.payload.id);
        }
    }
})

export default taskSlice.reducer;
