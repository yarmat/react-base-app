import {combineReducers} from "redux";
import reducers from './reducers';
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers(reducers);

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
