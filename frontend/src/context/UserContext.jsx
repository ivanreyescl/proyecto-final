import { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const returnAlert = (message) => toast.error(message, { autoClose: 2000 });
const returnSuccess = (message) => toast.success(message, { autoClose: 2000 });

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
    const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || '');

    const auth = async (email, password) => {
        try {
            const URL = 'http://localhost:5000/login';
            const { data } = await axios.post(URL, { email, password });

            // json-server-auth devuelve: accessToken y user
            setToken(data.accessToken);
            setEmail(data.user.email);
            setFirstName(data.user.firstName || '');
            setLastName(data.user.lastName || '');
            setRole(data.user.role || '');

            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('firstName', data.user.firstName || '');
            localStorage.setItem('lastName', data.user.lastName || '');
            localStorage.setItem('role', data.user.role || '');

            return true;
        } catch (error) {
            returnAlert(error.response?.data || 'Error en la autenticación');
            return false;
        }
    };

    const register = async (email, firstName, lastName, password) => {
        try {
            const URL = 'http://localhost:5000/register';
            const { data } = await axios.post(URL, { email, firstName, lastName, password });

            setToken(data.accessToken);
            setEmail(data.user.email);
            setFirstName(data.user.firstName || '');
            setLastName(data.user.lastName || '');
            setRole(data.user.role || '');

            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('firstName', data.user.firstName || '');
            localStorage.setItem('lastName', data.user.lastName || '');
            localStorage.setItem('role', data.user.role || '');

            returnSuccess('Usuario registrado exitosamente, sesión iniciada automáticamente.');
            return true;
        } catch (error) {
            returnAlert(error.response?.data || 'Error al registrar el usuario');
            return false;
        }
    };

    const logout = () => {
        setToken('');
        setEmail('');
        setFirstName('');
        setLastName('');
        setRole('');
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
            const { data } = await axios.get('http://localhost:5000/me', {
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

