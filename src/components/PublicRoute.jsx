import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (user) {
        const role = user.role?.toLowerCase();
        if (role === 'admin') return <Navigate to="/admin" />;
        if (role === 'teacher') return <Navigate to="/teacher" />;
        if (role === 'student') return <Navigate to="/student" />;
        return <Navigate to="/" />;
    }

    return children;
};

export default PublicRoute;
