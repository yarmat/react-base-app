import React, {Suspense, useEffect} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import Spinner from "./components/Spinner";
import {useActions} from "./hooks/useActions";
import IUser from "./models/IUser";

function App() {
    const {setUserActionCreator, setIsAuthActionCreator} = useActions();

    useEffect(() => {
        if (localStorage.getItem('isAuth')) {
            setIsAuthActionCreator(true);
            const user = JSON.parse(localStorage.getItem('user') as string) as IUser;
            setUserActionCreator(user);
        }
    }, [])

    return (
        <Suspense fallback={<Spinner/>}>
            <AppRouter/>
        </Suspense>
    );
}

export default App;
