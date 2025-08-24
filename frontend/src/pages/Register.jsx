import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext.jsx';

const Register = () => {
    const [user, setUser] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirmPassword: ''
    });

    const { register } = useContext(UserContext)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    };

    const returnAlert = (message) => toast.error(message, { autoClose: 2000 });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, first_name, last_name, password, confirmPassword } = user;

        if (password.length < 6) {
            return returnAlert('La contraseña debe tener al menos 6 caracteres');
        } else if (password !== confirmPassword) {
            return returnAlert('Las contraseñas no coinciden')
        } else if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            return returnAlert('Por favor rellena todos los campos')
        } else {
            const isRegistered = await register(email, first_name, last_name, password)

            if (isRegistered) {
                setUser({ email: '', first_name: '', last_name: '', password: '', confirmPassword: '' })
                window.location.href = '/'
            }
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card col-md-6">
                <div className="card-body">
                    <h2 className="card-title text-center">Registrarse</h2>
                    <form onSubmit={handleSubmit}>
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
                            <label htmlFor="first_name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                placeholder="Ingrese su nombre"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                                placeholder="Ingrese su apellido"
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
                                placeholder="Ingrese una contraseña"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirme contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirme la contraseña"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={!user.email.trim() || !user.first_name.trim() || !user.last_name.trim() || !user.password.trim() || !user.confirmPassword.trim()}
                        >
                            Registrarse
                        </button>
                        <hr></hr>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;