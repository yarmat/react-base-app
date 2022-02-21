import IUser from "../../../models/IUser";

export interface RegisterData {
    username: string,
    first_name: string,
    last_name: string,
    password: string
}

export interface AuthState {
    isAuth: boolean,
    user: IUser,
    isLoading: boolean,
    error: string
}
