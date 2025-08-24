import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { FavoriteContext } from '../context/FavoriteContext';
import { ProductContext } from '../context/ProductsContext';
import { urlBaseServer } from '../server_config';
import Button from '../components/Button';
import { useAddToFavorite } from "../hooks/addToFavorite";

const Profile = () => {
    const { first_name, last_name, role, logout, userId, token } = useContext(UserContext);
    const { deleteProduct } = useContext(ProductContext);
    const { cart } = useContext(CartContext);
    const { handleLike } = useAddToFavorite();
    const { favorites, fetchFavorites } = useContext(FavoriteContext);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    // --- Admin state ---
    const [adminProducts, setAdminProducts] = useState([]);
    const [adminLoading, setAdminLoading] = useState(true);
    const [adminUsers, setAdminUsers] = useState([]);
    const navigate = useNavigate();
            useEffect(() => {
            if (role === 'Normal') {
                const fetchUserData = async () => {
                try {
                    setLoading(true);

                    const response = await fetch(`${urlBaseServer}/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                    });
                    const users = await response.json();
                    const user = users.user.find(u => u.id === userId);

                    if (user) {
                    fetchFavorites();

                    //TODO: Se debe adaptar lógica de items pagados
                    //const paid_cart = cart || []
                    const userCarts = [];

                    setPurchases(userCarts.length ? userCarts : []);
                    }

                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
                };

                fetchUserData();
            }
            }, [role, first_name, last_name, token, userId]);

    // --- Fetch all products for admin view ---
    useEffect(() => {
        if (role == 'Administrador') {
            const fetchAllProducts = async () => {
                try {
                    setAdminLoading(true);
                    const response = await fetch(`${urlBaseServer}/products`);
                    const products = await response.json();
                    //const normalized = Array.isArray(products[0]) ? products[0] : products;
                    const normalized = Array.isArray(products) ? products : products.products;
                    setAdminProducts(normalized);
                } catch (error) {
                    console.error("Error fetching products for admin:", error);
                } finally {
                    setAdminLoading(false);
                }
            };
            fetchAllProducts();
            const fetchAllUsers = async () => {
                try {
                    setAdminLoading(true);
                    const response = await fetch(`${urlBaseServer}/users/all`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const users = await response.json();
                    console.log(users)
                    const normalized = (Array.isArray(users) ? users : users.users).filter(u => u.id !== userId);
                    setAdminUsers(normalized);
                } catch (error) {
                    console.error("Error fetching users for admin:", error);
                } finally {
                    setAdminLoading(false);
                }
            };
            fetchAllUsers();
        }
    }, [role]);

    const handleDeleteProduct = async (id) => {
        // Usar SweetAlert2 para confirmación
        const Swal = (await import('sweetalert2')).default;
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        });
        const confirmed = result.isConfirmed;
        if (!confirmed) return;

        try {
            const success = await deleteProduct(id);
            if (success) {
                setAdminProducts(prev => prev.filter(p => p.id !== id));
            } else {
                alert('No se pudo eliminar el producto');
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('No se pudo eliminar el producto. Revisa la consola.');
        }
    };

    const handleRoleChange = async (userId, newRoleId) => {
        try {
            await fetch(`${urlBaseServer}/users/${userId}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ role_id: newRoleId })
            });

            setAdminUsers(prev =>
            prev.map(user =>
                user.id === userId ? { ...user, role_id: newRoleId, role_description: prev.find(u => u.role_id == newRoleId)?.role_description } : user
            )
            );
        } catch (error) {
            console.error('Error actualizando rol:', error);
        }
    };

    const handleEditProduct = (id) => {
        navigate(`/products/edit/${id}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0
        }).format(price);
    };

    const uniqueRolesArray = Array.from(
        new Map(
            adminUsers
            .filter(u => u.role_description)
            .map(u => [u.role_id, { role_id: u.role_id, role_description: u.role_description }])
        ).values()
    );


    return (
        <div className="container py-4">
            {/* Header */}
            <div className="row mb-4">
                <div className="col">
                    <div className="p-4 bg-primary bg-gradient text-white rounded-3 shadow">
                        <h1 className="display-6 mb-0">
                            <i className="bi bi-person-circle me-2"></i>
                            ¡Bienvenido {first_name} {last_name}!
                        </h1>
                    </div>
                </div>
            </div>

            {/* Panel de administración */}
            {role === 'Administrador' && (
                <>
                    <div className="card shadow-sm mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Usuarios registrados</h5>
                        </div>
                        <div className="card-body">
                            {adminLoading ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : adminUsers.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="mb-0">No hay usuarios registrados.</p>
                                </div>
                            ) : (
                                <div className="list-group">
                                    {adminUsers.map(user => (
                                        <div key={user.id} className="list-group-item d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                                <div>
                                                    <div className="fw-semibold">{user.first_name} {user.last_name}</div>
                                                    <small className="text-muted">{user.email} • {user.role_description || 'Sin rol'}</small>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <select
                                                    className="form-select"
                                                    value={user.role_id || ''}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                <option value="">Sin rol</option>
                                                {uniqueRolesArray.map(role => (
                                                    <option key={role.role_id} value={role.role_id}>
                                                    {role.role_description}
                                                    </option>
                                                ))}
                                            </select>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDeleteUser(user.id)}
                                            >
                                                Eliminar
                                            </button>
                                            </div>
                                        </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {role === 'Administrador' && (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Link to={`/products/new`}>
                            <Button label="Agregar Producto" icon="fa fa-plus" />
                        </Link>
                    </div>
                    <div className="card shadow-sm">
                        <div className="card-header">
                            <h5 className="mb-0">Productos registrados</h5>
                        </div>
                        <div className="card-body">
                            {adminLoading ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : adminProducts.length === 0 ? (
                                <div className="text-center py-4">
                                    <p className="mb-0">No hay productos registrados.</p>
                                </div>
                            ) : (
                                <div className="list-group">
                                    {adminProducts.map(prod => (
                                        <div key={prod.id} className="list-group-item d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                                <img
                                                    src={prod.image}
                                                    alt={prod.name}
                                                    style={{ width: 64, height: 64, objectFit: 'contain', borderRadius: 6 }}
                                                    className="bg-light p-1"
                                                />
                                                <div>
                                                    <div className="fw-semibold">{prod.name}</div>
                                                    <small className="text-muted">{prod.category} • {formatPrice(prod.price)}</small>
                                                </div>
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-primary"
                                                    onClick={() => handleEditProduct(prod.id)}
                                                >
                                                    Editar
                                                </button>
                                                
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleDeleteProduct(prod.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* User content */}
            {role == 'Normal' && (
                <>
                    {/* Favoritos */}
                    <div className="row mb-4">
                        <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-header bg-danger bg-opacity-10">
                                    <h2 className="h5 mb-0 text-danger">
                                        <i className="bi bi-heart-fill me-2"></i>
                                        Tus Favoritos
                                    </h2>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-danger" role="status">
                                                <span className="visually-hidden">Cargando...</span>
                                            </div>
                                            <p className="mt-2">Cargando tus favoritos...</p>
                                        </div>
                                    ) : favorites.length > 0 ? (
                                        <div className="row">
                                            {favorites.map(product => (
                                                <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                                    <div className="card h-100 border-0 shadow-hover">
                                                        <div className="position-absolute top-0 end-0 m-2">
                                                            <span className="badge bg-dark">{product.category}</span>
                                                        </div>
                                                        <div className="ratio ratio-1x1 bg-light">
                                                            <img src={product.image} className="card-img-top p-3 img-contain" alt={product.name} />
                                                        </div>
                                                        <div className="card-body d-flex flex-column">
                                                            <h5 className="card-title fs-6 text-truncate">{product.name}</h5>
                                                            <p className="card-text small text-muted mb-2 line-clamp-2">{product.detail}</p>
                                                            <button
                                                                className="favorite-item"
                                                                onClick={(e) => handleLike({ id: product.id, name: product.name, price: product.price, image: product.image, detail: product.detail, category: product.category }, e)}
                                                                style={{ background: 'none', border: 'none', padding: 0, display: token ? 'block' : 'none' }}
                                                            >
                                                                <i className={`fas fa-heart`}></i>
                                                            </button>
                                                            <div className="mt-auto">
                                                                <h4 className="text-primary fw-bold mb-2">{formatPrice(product.price)}</h4>
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-secondary'}`}>
                                                                        {product.stock > 0 ? `Disponible: ${product.stock}` : 'Agotado'}
                                                                    </span>
                                                                    <Link to={`/products/${product.id}`} className="btn btn-sm btn-outline-primary stretched-link">
                                                                        Ver Detalles
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-5">
                                            <i className="bi bi-heart text-danger" style={{ fontSize: '3rem' }}></i>
                                            <h4 className="mt-3">No tienes favoritos aún</h4>
                                            <p className="text-muted">Guarda tus productos favoritos para verlos aquí</p>
                                            <Link to="/products" className="btn btn-danger mt-2">
                                                Explorar Productos
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Purchases */}
                    <div className="row">
                        <div className="col">
                            <div className="card shadow-sm">
                                <div className="card-header bg-success bg-opacity-10">
                                    <h2 className="h5 mb-0 text-success">
                                        <i className="bi bi-bag-check me-2"></i>
                                        Tus Compras
                                    </h2>
                                </div>
                                <div className="card-body">
                                    {loading ? (
                                        <div className="text-center py-5">
                                            <div className="spinner-border text-success" role="status">
                                                <span className="visually-hidden">Cargando...</span>
                                            </div>
                                            <p className="mt-2">Cargando tu historial...</p>
                                        </div>
                                    ) : purchases.length > 0 ? (
                                        <div className="row">
                                            {purchases.map(product => (
                                                <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                                    <div className="card h-100 border-0 shadow-sm">
                                                        <div className="ratio ratio-1x1 bg-light">
                                                            <img src={product.image} className="card-img-top p-3 img-contain" alt={product.name} />
                                                        </div>
                                                        <div className="card-body text-center">
                                                            <h5 className="card-title fs-6 text-truncate">{product.name}</h5>
                                                            <h4 className="text-success fw-bold">{formatPrice(product.price)}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-5">
                                            <i className="bi bi-cart-x text-muted" style={{ fontSize: '3rem' }}></i>
                                            <h4 className="mt-3">No tienes compras registradas</h4>
                                            <p className="text-muted">Tus compras aparecerán aquí</p>
                                            <Link to="/products" className="btn btn-success mt-2">
                                                Ver Catálogo
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Logout */}
            <div className="row mt-4">
                <div className="col text-center">
                    <button onClick={logout} className="btn btn-outline-danger px-4 py-2">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;