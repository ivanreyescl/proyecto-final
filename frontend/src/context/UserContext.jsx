import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urlBaseServer } from "../server_config";

const returnAlert = (message) => toast.error(message, { autoClose: 2000 });
const returnSuccess = (message) => toast.success(message, { autoClose: 2000 });

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(Number(localStorage.getItem('userId')) || 0);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
    const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || '');

        useEffect(() => {
        setUserId(Number(localStorage.getItem('userId')) || 0);
        setToken(localStorage.getItem('token') || '');
        setEmail(localStorage.getItem('email') || '');
        setFirstName(localStorage.getItem('firstName') || '');
        setLastName(localStorage.getItem('lastName') || '');
        setRole(localStorage.getItem('role') || '');
    }, []);

    const auth = async (email, password) => {
        try {
            const URL = `${urlBaseServer}/login`;
            const { data } = await axios.post(URL, { email, password });
            setToken(data.token);
            setUserId(data.user.id);
            setEmail(data.user.email);
            setFirstName(data.user.firstName || '');
            setLastName(data.user.lastName || '');
            setRole(data.user.role_description || '');
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('firstName', data.user.firstName || '');
            localStorage.setItem('lastName', data.user.lastName || '');
            localStorage.setItem('role', data.user.role_description || 'Normal');

            returnSuccess('Sesión iniciada.');
            return true;
        } catch (error) {
            returnAlert(error.response?.data.error || 'Error en la autenticación');
            return false;
        }
    };

    const register = async (email, firstName, lastName, password) => {
        try {
            const URL = `${urlBaseServer}/register`;
            const { data } = await axios.post(URL, { email, firstName, lastName, password });

            setToken(data.token);
            setEmail(data.user.email);
            setFirstName(data.user.firstName || '');
            setLastName(data.user.lastName || '');
            setRole(data.user.role_description || 'Normal');

            localStorage.setItem('token', data.token);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('firstName', data.user.firstName || '');
            localStorage.setItem('lastName', data.user.lastName || '');
            localStorage.setItem('role', data.user.role_description || 'Normal');

            returnSuccess('Usuario registrado exitosamente, sesión iniciada automáticamente.');
            return true;
        } catch (error) {
            returnAlert(error.response?.data || 'Error al registrar el usuario');
            return false;
        }
    };

    const logout = () => {
        setUserId(0);
        setToken('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setRole('');
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('role');
        returnSuccess('Se ha cerrado sesión');
    };

    const profile = async () => {
        const storedToken = localStorage.getItem('token');
        try {
            const { data } = await axios.get(`${urlBaseServer}/me`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            });

            setEmail(data.email || '');
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            return true;
        } catch (error) {
            returnAlert(error.response?.data || 'Error al obtener el perfil del usuario');
            return false;
        }
    };

    const setUserState = {
        userId,
        token,
        email,
        firstName,
        lastName,
        role,
        auth,
        register,
        profile,
        logout
    };

    return (
        <UserContext.Provider value={setUserState}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

