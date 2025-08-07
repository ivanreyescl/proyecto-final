import './Navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'

const Navbar = () => {
    const { token, logout } = useContext(UserContext)
    const { total } = useContext(CartContext)
    const formattedTotal = total.toLocaleString()
    return (
        <nav className="navbar navbar-expand-lg bg-dark text-white">
            <div className="container-fluid justify-content-end">
                <li className="nav-item-title me-3">
                    <Link className="nav-link text-white" to="/">¡ Pc Components!</Link>
                </li>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row align-items-center">
                    {/* 
                        <li className="nav-item-box me-3">
                            <Link className="nav-link text-white" to="/product/p001">Products</Link>
                        </li>
                    */}
                    <li className="nav-item me-3">
                        <Link className="nav-link text-white" to={token ? "/profile" : "/login"}>
                            {token ? "👤 Perfil" : " Iniciar Sesión"}
                        </Link>
                    </li>
                    <li className="nav-item me-3">
                        {token ? (
                            <Link className="nav-link text-white" to="/" onClick={logout}>
                                Cerrar Sesión
                            </Link>
                        ) : (
                            <Link className="nav-link text-white" to="/register">
                                Registrarse
                            </Link>
                        )}
                    </li>
                    <li className="nav-item me-3">
                        <Link className="nav-link text-white" to="/products">Productos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" id="total_product" to="/cart">
                            🛒 ${formattedTotal}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
