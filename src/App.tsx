import React, {Suspense, useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Spinner from "./components/Spinner";
import {useActions} from "./hooks/useActions";
import IUser from "./models/IUser";
import {useDispatch} from "react-redux";

function App() {
    const {setUserAuth} = useActions();
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('isAuth')) {
            const user = JSON.parse(localStorage.getItem('user') as string) as IUser;
            dispatch(setUserAuth(user));
        }
        // eslint-disable-next-line
    }, [])

    return (
        <Suspense fallback={<Spinner/>}>
            <AppRouter/>
        </Suspense>
    );
}

export default App;
