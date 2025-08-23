import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, totalPrice } = useContext(CartContext);
    const { token, userId } = useContext(UserContext);

    const checkout = async () => {
        if (!userId) return alert('Debes iniciar sesión para pagar');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/checkouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ user_id: userId })
            });

            const data = await response.json();
            alert(data.message || 'Pago procesado correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al procesar el pago');
        }
    };
    const formatCLP = (value) => value?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">Tu Carrito</h2>
            {cart.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col" className="text-center">Cantidad</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.cartItemId}>
                                        <td style={{ width: 100 }}>
                                            <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ maxHeight: 60 }} />
                                        </td>
                                        <td>
                                            <strong>{item.name}</strong>
                                        </td>
                                        <td>
                                            {formatCLP(item.price)}
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => decreaseQuantity(item.cartItemId, item.count)}>-</button>
                                                <span className="mx-3 fw-bold">{item.count}</span>
                                                <button className="btn btn-outline-primary btn-sm" onClick={() => increaseQuantity(item.cartItemId, item.count)}>+</button>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <h4 className="mb-0">Total: <span className="text-success">{formatCLP(totalPrice)}</span></h4>
                        {token ? (
                            <button className="btn btn-dark btn-lg" onClick={checkout}>Pagar</button>
                        ) : (
                            <button className="btn btn-secondary btn-lg" disabled>Inicia sesión para pagar</button>
                        )}
                    </div>
                </>
            ) : (
                <div className="alert alert-info text-center">
                    <h4 className="mb-0">El carrito está vacío</h4>
                </div>
            )}
        </div>
    );
};

export default Cart;
