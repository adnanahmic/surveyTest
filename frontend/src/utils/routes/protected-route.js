// Protected Routes
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from 'utils/functions';

const ProtectedRoute = () => {
    return (
        <React.Fragment>
        {
            getCookie('token') ? <Outlet /> : <Navigate to="/login" />   
        }
        </React.Fragment>
    )
}

export default ProtectedRoute;
