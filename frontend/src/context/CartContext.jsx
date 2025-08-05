import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (pizzaToAdd) => {
        setCart((prevCart) => {
          const pizzaInCart = prevCart.find(pizza => pizza.id === pizzaToAdd.id)
          if (pizzaInCart) {
            return prevCart.map(pizza =>
              pizza.id === pizzaToAdd.id ? { ...pizza, count: pizza.count + 1 } : pizza
            )
          } else {
            return [...prevCart, { ...pizzaToAdd, count: 1 }]
          }
        })
      }
      
    const increaseQuantity = (id) => {
        setCart(cart.map(pizza =>
            pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
        ))
    }

    const decreaseQuantity = (id) => {
        setCart(cart.reduce((acc, pizza) => {
            if (pizza.id === id) {
                if (pizza.count > 1) {
                    acc.push({ ...pizza, count: pizza.count - 1 });
                }
            } else {
                acc.push(pizza);
            }
            return acc;
        }, []));
    }

    const total = cart.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0)


    
    return (
        <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, total }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
