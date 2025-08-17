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
    const returnSuccessAlertWindow = (message) => {
        import('sweetalert2').then(Swal => {
            Swal.default.fire({
                icon: 'success',
                title: message,
                confirmButtonText: 'Entendido!',
                timerProgressBar: true
            }).then(() => {
                setUser({ email: '', password: '' })
                window.location.href = '/login';
            });
        });
    };

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
                returnSuccessAlertWindow(`Se ha iniciado sesión con el usuario ${email.split('@')[0].trim()}`)
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
