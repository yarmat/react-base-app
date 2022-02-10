import IUser from "../../../models/IUser";
import {AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingAction, SetUserAction} from "./types";
import {AppDispatch} from "../../index";
import axios from 'axios';

export const setUserActionCreator = (user: IUser): SetUserAction => ({type: AuthActionEnum.SET_USER, payload: user});
export const setIsAuthActionCreator = (isAuth: boolean): SetIsAuthAction => ({
    type: AuthActionEnum.SET_IS_AUTH,
    payload: isAuth
});
export const setIsLoadingActionCreator = (isLoading: boolean): SetIsLoadingAction => ({
    type: AuthActionEnum.SET_IS_LOADING,
    payload: isLoading
});
export const setErrorActionCreator = (error: string): SetErrorAction => ({
    type: AuthActionEnum.SET_ERROR,
    payload: error
});

export const loginActionCreator = (username: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setIsLoadingActionCreator(true));
        dispatch(setErrorActionCreator(''));
        const response = await axios.get<IUser[]>(`http://localhost:3001/users?username=${username}`);
        const user = response.data.find(item => item.username === username && item.password === password);
        if (user) {
            localStorage.setItem('isAuth', 'true');
            localStorage.setItem('user', JSON.stringify({...user, password: ''}));
            dispatch(setUserActionCreator(user));
            dispatch(setIsAuthActionCreator(true));
        } else {
            dispatch(setErrorActionCreator('User or password is incorrect.'));
        }
    } catch (e) {
        dispatch(setErrorActionCreator('Something went wrong.'));
    } finally {
        dispatch(setIsLoadingActionCreator(false));
    }
}

export const logoutActionCreator = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
    dispatch(setIsAuthActionCreator(false));
    dispatch(setUserActionCreator({} as IUser));
}

export default {
    setUserActionCreator,
    setIsAuthActionCreator,
    setIsLoadingActionCreator,
    setErrorActionCreator,
    loginActionCreator,
    logoutActionCreator
}
