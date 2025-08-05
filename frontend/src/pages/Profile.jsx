import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'

const Profile = () => {

    const { email } = useContext(UserContext)

    const { logout } = useContext(UserContext)

    const handleLogout = () => {
        logout()
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="text-center">
                <h2>Perfil de Usuario</h2>
                <p>Email: {email ? email : 'N/A' }</p>
                <Link to="/" className="btn btn-danger" onClick={handleLogout}>Cerrar Sesión</Link>
            </div>
        </div>
    );
};

export default Profile;
