import './Navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
    const { token, logout } = useContext(UserContext)
    const { totalPrice } = useContext(CartContext)
    const formattedTotal = totalPrice.toLocaleString()
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-3" to="/">
                    ¡Pc Components!
                </Link>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row align-items-center gap-3">
                    <li className="nav-item">
                        <Link className="nav-link d-flex align-items-center" to={token ? "/profile" : "/login"}>
                            {token ? <><span className="me-1">👤</span>Perfil</> : "Iniciar Sesión"}
                        </Link>
                    </li>
                    <li className="nav-item">
                        {token ? (
                            <Link className="nav-link text-white" to="/" onClick={logout}>
                                Cerrar Sesión
                            </Link>
                        ) : (
                            <Link className="btn" to="/register">
                                Registrarse
                            </Link>
                        )}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">
                            Productos
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="btn position-relative" id="total_product" to="/cart">
                            🛒
                            <span className="ms-2">${formattedTotal}</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
