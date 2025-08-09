import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
    const [user, setUser] = useState({ email: '', password: '' })
    const { auth } = useContext(UserContext)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const returnAlert = (message) => toast.error(message, { autoClose: 2000 });
    const returnSuccess = (message) => toast.success(message, { autoClose: 2000 });

    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = user

        if (password.length < 6) {
            return returnAlert('La contraseña debe tener al menos 6 caracteres')
        } else if (!email.trim() || !password.trim()) {
            return returnAlert('Por favor rellena todos los campos')
        } else {
            const isAuthenticated = await auth(email, password)

            if (isAuthenticated) {
                returnSuccess(`Se ha iniciado sesión con el usuario ${email.split('@')[0].trim()}`)
                setUser({ email: '', password: '' })
            }
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card col-md-6">
                <div className="card-body">
                    <h2 className="card-title text-center">Iniciar sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Ingrese su email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={user.password}
                                placeholder="Ingrese su contraseña"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={!user.email.trim() || !user.password.trim()}
                        >
                            Iniciar sesión
                        </button>
                        <hr></hr>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
