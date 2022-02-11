import IUser from "../../../models/IUser";
import {
    AuthActionEnum,
    RegisterData,
    SetErrorAction,
    SetIsAuthAction,
    SetIsLoadingAction,
    SetUserAction
} from "./types";
import {AppDispatch} from "../../index";
import AuthApiService, {RegisterApiPayload} from "../../../api/auth";

export const setUserAuth = (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user});
export const setIsAuth = (isAuth: boolean): SetIsAuthAction => ({
    type: AuthActionEnum.SET_IS_AUTH,
    payload: isAuth
});
export const setIsLoadingAuth = (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading
});
export const setErrorAuth = (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error
});

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingAuth(true));
        dispatch(setErrorAuth(''));
        const user = await AuthApiService.login(username, password);
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify({...user, password: ''}));
        dispatch(setUserAuth(user));
        dispatch(setIsAuth(true));
    } catch (e: any) {
        dispatch(setErrorAuth(e.message));
    } finally {
        dispatch(setIsLoadingAuth(false));
    }
}


export const register = (data: RegisterData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingAuth(true));
        dispatch(setErrorAuth(''));

        const user = await AuthApiService.register({
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            password: data.password
        } as RegisterApiPayload);

        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify({...user, password: ''}));
        dispatch(setUserAuth(user));
        dispatch(setIsAuth(true));
    } catch (e: any) {
        dispatch(setErrorAuth(e.message));
    } finally {
        dispatch(setIsLoadingAuth(false));
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
    dispatch(setIsAuth(false));
    dispatch(setUserAuth({} as IUser));
}
