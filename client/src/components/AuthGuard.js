import React, { Component, useContext } from 'react';
import { Navigate, useLocation, Route  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Notes from './Notes'

const AuthGuard = ({ element }) => {
    const { isLoggedIn, token } = useContext(AuthContext);

    const location = useLocation();

    // console.log(isLoggedIn)
    // console.log(!token)
    // console.log(location.pathname)

    // if (!token && !location.pathname.includes('register')) {
    //     // Redirect to login page if not logged in
    //     if (!location.pathname.includes("/login"))
    //         return <Navigate to="/login" />;
    // }

    // if (!token && !location.pathname.includes('login')) {
    //     return <Navigate to="/login"/>;
    // }


    // return <>
    // {children}
    // </>;
    console.log(token);
    
return (
        token ? <Notes/> : <Navigate to="/login"/>
    );
};


export default AuthGuard;
