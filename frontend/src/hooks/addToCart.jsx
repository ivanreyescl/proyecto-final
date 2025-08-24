import { useContext } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

export const useAddToCart = () => {
    const { addToCart } = useContext(CartContext);
    const { userId } = useContext(UserContext);
    return (product) => {
        if (!userId) {
            toast.error('Debes iniciar sesión para agregar productos al carrito', { autoClose: 2000 });
            return;
        }
        addToCart(product);
        toast.success(`Producto ${product.name} agregado con éxito`, { autoClose: 1000 });
    };
}