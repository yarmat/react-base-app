import React, {Suspense, useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Spinner from "./components/Spinner";
import {useActions} from "./hooks/useActions";
import IUser from "./models/IUser";

function App() {
    const {setUserAuth, setIsAuth} = useActions();

    useEffect(() => {
        if (localStorage.getItem('isAuth')) {
            setIsAuth(true);
            const user = JSON.parse(localStorage.getItem('user') as string) as IUser;
            setUserAuth(user);
        }
    }, [])

    return (
        <Suspense fallback={<Spinner/>}>
            <AppRouter/>
        </Suspense>
    );
}

export default App;
