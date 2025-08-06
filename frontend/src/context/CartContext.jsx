import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (productToAdd) => {
        setCart((prevCart) => {
          const productInCart = prevCart.find(product => product.id === productToAdd.id)
          if (productInCart) {
            return prevCart.map(product =>
              product.id === productToAdd.id ? { ...product, count: product.count + 1 } : product
            )
          } else {
            return [...prevCart, { ...productToAdd, count: 1 }]
          }
        })
      }
      
    const increaseQuantity = (id) => {
        setCart(cart.map(product =>
            product.id === id ? { ...product, count: product.count + 1 } : product
        ))
    }

    const decreaseQuantity = (id) => {
        setCart(cart.reduce((acc, product) => {
            if (product.id === id) {
                if (product.count > 1) {
                    acc.push({ ...product, count: product.count - 1 });
                }
            } else {
                acc.push(product);
            }
            return acc;
        }, []));
    }

    const total = cart.reduce((acc, product) => acc + product.price * product.count, 0)


    
    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, total }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
