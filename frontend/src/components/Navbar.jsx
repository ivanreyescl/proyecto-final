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
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item-title">
                        <Link className="nav-link text-white" to="/">¡Pc Components!</Link>
                    </li>
                    <li className="nav-item-box">
                        <Link className="nav-link text-white" to="/"> Home</Link>
                    </li>
                    {/*
                        <li className="nav-item-box">
                            <Link className="nav-link text-white" to="/product/p001">Products</Link>
                        </li>
                    */}
                    <li className="nav-item-box">
                        <Link className="nav-link text-white" to={token ? "/profile" : "/login"}>
                            {token ? "👤 Profile" : "🔐 Login"}
                        </Link>
                    </li>
                    <li className="nav-item-box">
                        {token ? (
                            <Link className="nav-link text-white" to="/" onClick={logout}>
                                🔒 Logout
                            </Link>
                        ) : (
                            <Link className="nav-link text-white" to="/register">
                                📝 Register
                            </Link>
                        )}
                    </li>
                </ul>
                <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item-box">
                        <Link className="nav-link text-white" id="total_product" to="/cart">
                            🛒 ${formattedTotal}
                        </Link>
                    </li>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
