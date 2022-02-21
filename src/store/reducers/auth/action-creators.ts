import IUser from "../../../models/IUser";
import {AppDispatch} from "../../index";
import AuthApiService, {RegisterApiPayload} from "../../../api/auth";

import {authSlice} from "./index";
import {RegisterData} from "./types";

export const setUserAuth = authSlice.actions.setUser;

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.setIsLoading(true));
        const user = await AuthApiService.login(username, password);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify({...user, password: ''}));
        dispatch(authSlice.actions.setUser(user));
    } catch (e: any) {
        dispatch(authSlice.actions.setError(e.message));
    } finally {
        dispatch(authSlice.actions.setIsLoading(false));
    }
}

export const register = (data: RegisterData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authSlice.actions.setIsLoading(true));

        const user = await AuthApiService.register({
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password
        } as RegisterApiPayload);

        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify({...user, password: ''}));
        dispatch(authSlice.actions.setUser(user));
    } catch (e: any) {
        dispatch(authSlice.actions.setError(e.message));
    } finally {
        dispatch(authSlice.actions.setIsLoading(false));
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
    dispatch(authSlice.actions.setUser({} as IUser));
}
