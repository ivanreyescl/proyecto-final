import { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urlBaseServer } from "../server_config";

const returnAlert = (message) => toast.error(message, { autoClose: 2000 });
const returnSuccess = (message) => toast.success(message, { autoClose: 2000 });


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [email, setEmail] = useState(localStorage.getItem('email') || '')
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '')
    const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '')

    const auth = async (email, password) => {
        try {
            const URL = `${urlBaseServer}/login`;
            const { data } = await axios.post(URL, { email, password })
            setToken(data.accessToken)
            setEmail(data.email)
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.email)
            return true
        } catch (error) {
            returnAlert(error.response?.data?.message || 'Error en la autenticación')
            return false
        }
    };

    const register = async (email, firstName, lastName, password) => {
        try {
            const URL = `${urlBaseServer}/register`;
            const { data } = await axios.post(URL, { email, firstName, lastName, password })
            setToken(data.accessToken)
            setEmail(data.email)
            setFirstName(data.firstName)
            setLastName(data.lastName)
            localStorage.setItem('token', data.token)
            localStorage.setItem('email', data.email)
            localStorage.setItem('firstName', data.firstName)
            localStorage.setItem('lastName', data.lastName)
            returnSuccess('Usuario registrado exitosamente, se ha iniciado sesión automaticamente.')
            return true
        } catch (error) {
            returnAlert(error.response?.data?.message || 'Error al registrar el usuario')
            return false
        }
    };

    const logout = () => {
        setToken('')
        setEmail('')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        returnSuccess('Se ha cerrado sesión')
    }

    const profile = async () => {
        const token = localStorage.getItem('token')
        try {
            const { data } = await axios.get(`${urlBaseServer}/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUser(data)
            return true
        } catch (error) {
            returnAlert(error.response?.data?.message || 'Error al obtener el perfil del usuario')
            return false
        }
    }

    const setUserState = {
        token,
        email,
        firstName,
        lastName,
        auth,
        register,
        profile,
        logout
    }
    return (
        <UserContext.Provider value={setUserState}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider
