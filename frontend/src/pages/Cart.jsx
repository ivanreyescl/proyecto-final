import React, { useContext } from 'react'
import axios from 'axios'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, total } = useContext(CartContext)
    const { token } = useContext(UserContext)

    const checkout = async () => {

        try {
            const URL = 'http://localhost:5000/api/checkouts'
            const { data } = await axios.post(URL, { cart }, {
                headers: { Authorization: `Bearer ${token}` }
            })
    
            alert(data.message)
        } catch (error) {
            alert(error.response?.data?.error || 'Error al procesar el pago')
        }
    }

    return (
        <div className="container text-center">
            {cart.length > 0 ? (
                <>
                    {cart.map(product => (
                        <div key={product.id + product.name} className="row align-items-center mb-3">
                            <div className="col-md-2">
                                <img src={product.image} alt={product.name} className="img-fluid" />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.name}</h3>
                            </div>
                            <div className="col-md-4 d-flex justify-content-center align-items-center">
                                <p className="p-5 fw-bold">Precio: ${product.price}</p>
                                <button className="btn btn-outline-danger" onClick={() => decreaseQuantity(product.id)}>-</button>
                                <span className="mx-3 fw-bold">{product.count}</span>
                                <button className="btn btn-outline-primary" onClick={() => increaseQuantity(product.id)}>+</button>
                            </div>
                        </div>
                    ))}
                    <h3 className="text-start">Total: ${total}</h3>
                    {token ? <button className="btn btn-outline-dark" onClick={checkout}>Pagar</button> : <button className="btn btn-outline-secondary" disabled>Inicia sesión para pagar</button>}
                </>
            ) : (
                <div>
                    <h3>El carrito está vacío</h3>
                </div>
            )}
        </div>
    )
}

export default Cart
