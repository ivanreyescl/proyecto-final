import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, totalPrice } = useContext(CartContext);
    const { token, userId } = useContext(UserContext);

    const checkout = async () => {
        if (!userId) return alert('Debes iniciar sesión para pagar');

        try {
            //const response = await fetch(`${process.env.REACT_APP_API_URL}/checkouts`, {
            //    method: 'POST',
            //    headers: {
            //        'Content-Type': 'application/json',
            //        Authorization: `Bearer ${token}`
            //    },
            //    body: JSON.stringify({ user_id: userId })
            //});

            const data = await response.json();
            alert(data.message || 'Pago procesado correctamente');
        } catch (error) {
            console.error(error);
            alert('Error al procesar el pago');
        }
    };
    return (
        <div className="container text-center">
            {cart.length > 0 ? (
                <>
                    {cart.map(item => (
                        <div key={item.cartItemId} className="row align-items-center mb-3">
                            <div className="col-md-2">
                                <img src={item.image} alt={item.name} className="img-fluid" />
                            </div>
                            <div className="col-md-4">
                                <h3>{item.name}</h3>
                            </div>
                            <div className="col-md-4 d-flex justify-content-center align-items-center">
                                <p className="p-5 fw-bold">Precio: ${item.price}</p>
                                <button className="btn btn-outline-danger" onClick={() => decreaseQuantity(item.cartItemId, item.count)}>-</button>
                                <span className="mx-3 fw-bold">{item.count}</span>
                                <button className="btn btn-outline-primary" onClick={() => increaseQuantity(item.cartItemId, item.count)}>+</button>
                            </div>
                        </div>
                    ))}
                    <h3 className="text-start">Total: ${totalPrice}</h3>
                    {token ? (
                        <button className="btn btn-outline-dark" onClick={checkout}>Pagar</button>
                    ) : (
                        <button className="btn btn-outline-secondary" disabled>Inicia sesión para pagar</button>
                    )}
                </>
            ) : (
                <div>
                    <h3>El carrito está vacío</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;
