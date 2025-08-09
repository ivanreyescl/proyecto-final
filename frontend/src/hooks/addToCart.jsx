import { useContext } from 'react';
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';

export const useAddToCart = () => {
    const { addToCart } = useContext(CartContext);
    return (product) => {
        addToCart(product);
        toast.success(`Producto ${product.name} agregado con éxito`, { autoClose: 1000 });
    };
}