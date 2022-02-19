import {TaskAction, TaskActionEnum, TaskState} from "./types";

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

export default function taskReducer(state = initialState, action: TaskAction): TaskState {
    switch (action.type) {
        case TaskActionEnum.SET_IS_LOADING:
            if (action.payload) {
                return {...state, isLoading: action.payload, error: ''}
            } else {
                return {...state, isLoading: action.payload}
            }
        case TaskActionEnum.SET_ERROR:
            return {...state, error: action.payload}
        case TaskActionEnum.SET_TASKS:
            return {...state, tasks: action.payload.tasks, pagination: action.payload.pagination, sort: action.payload.sort}
        case TaskActionEnum.UPDATE_TASK:
            return {...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t)}
        case TaskActionEnum.DELETE_TASK:
            return {...state, tasks: state.tasks.filter(t => t.id !== action.payload.id)}
        default:
            return state;
    }
}
