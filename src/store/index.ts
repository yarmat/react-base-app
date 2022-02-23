import {combineReducers} from "redux";
import reducers from './reducers';
import {configureStore} from "@reduxjs/toolkit";
import {taskAPI} from "../api/task";

const rootReducer = combineReducers({
    ...reducers,
    [taskAPI.reducerPath]: taskAPI.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
