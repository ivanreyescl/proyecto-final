import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import { urlBaseServer } from "../server_config";
import { toast } from 'react-toastify';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { userId } = useContext(UserContext);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const returnSuccess = (message) => {
        toast.success(message, {autoClose: 2000});
    };

    const returnAlert = (message) => {
        toast.error(message, {autoClose: 2000});
    };

    const fetchCart = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`${urlBaseServer}/user/${userId}/cart`);
            if (response.ok) {
                const data = await response.json();
                const flattenedCart = data.cart.cart_items.map(ci => ({
                    cartItemId: ci.cart_item_id,
                    id: ci.product_id,
                    count: ci.quantity,
                    ...ci.product
                })).filter(item => item.cartItemId !== null && item.id !== null);
                setCart(flattenedCart);
                setTotalPrice(data.cart.total_price || 0);
            } else {
                setCart([]);
                setTotalPrice(0);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCart([]);
            setTotalPrice(0);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const addToCart = async (product) => {
        try {
            const response = await fetch(`${urlBaseServer}/user/${userId}/cart-items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product_id: product.id, quantity: 1 })
            });
            if (response.ok) {
                fetchCart();
            }
        } catch (error) {
            returnAlert('Error al agregar el producto al carrito');
            console.error('Error adding to cart:', error);
        }
    };

    const increaseQuantity = async (cartItemId, currentQty) => {
        try {
            const newQty = currentQty + 1;
            await fetch(`${urlBaseServer}/cart-items/${cartItemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: newQty })
            });
            fetchCart();
            returnSuccess('Cantidad de producto aumentada');
        } catch (error) {
            returnAlert('Error al actualizar la cantidad');
            console.error(error);
        }
    };

    const decreaseQuantity = async (cartItemId, currentQty) => {
        try {
            const newQty = currentQty - 1;
            await fetch(`${urlBaseServer}/cart-items/${cartItemId}`, {
                method: newQty < 1 ? 'DELETE' : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: newQty })
            });
            fetchCart();
            returnSuccess('Cantidad de productos disminuida');
        } catch (error) {
            returnAlert('Error al actualizar la cantidad');
            console.error(error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
