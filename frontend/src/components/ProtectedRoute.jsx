import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(UserContext);
    const location = useLocation();

    if (token && (location.pathname === "/login" || location.pathname === "/register")) {
        return <Navigate to="/" />;
    }

    if (!token && (location.pathname === "/login" || location.pathname === "/register")) {
        return children
    }

    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;