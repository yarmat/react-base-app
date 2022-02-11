import axios from 'axios';
import IUser from "../models/IUser";

export interface RegisterApiPayload {
    username: string,
    first_name: string,
    last_name: string,
    password: string
}

export default class AuthApiService {
    static async login(username: string, password: string): Promise<IUser> {
        const response = await axios.get<IUser[]>(`http://localhost:3001/users?username=${username}`);

        const user = response.data.find(item => item.username === username && item.password === password);

        if (!user) {
            throw new Error('User or password is incorrect.');
        }

        return user;
    }

    static async register(payload: RegisterApiPayload): Promise<IUser> {
        const response = await axios.post<IUser>('http://localhost:3001/users', payload);

        return response.data;
    }
}
