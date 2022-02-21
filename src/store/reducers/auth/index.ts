import IUser from "../../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "./types";

const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            const user = action.payload;
            state.isAuth = Object.keys(user).length > 0;
            state.user = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            if  (action.payload) {
                state.error = '';
            }

            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
    extraReducers: {

    }
});

export default authSlice.reducer;
