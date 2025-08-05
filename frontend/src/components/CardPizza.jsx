import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from 'react-router-dom';
import Button from './Button'

const CardPizza = ({ id, name, price, ingredients, img, description }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    console.log(id, name)
    const pizzaToAdd = { id, name, price, img, description }
    addToCart(pizzaToAdd)
  }

  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="card shadow-sm">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="text-center card-title fw-bold">{capitalizedName}</h5>
          <hr />
          <div className="card-text d-flex flex-column justify-content-center">
            {description && <p className="text-center text-secondary">{description}</p>}
            <h5 className="text-center text-secondary">Ingredientes:</h5>
            <ul>
              {ingredients.map((ingredient) => (
                <li key={ingredient}>🍕 {ingredient}</li>
              ))}
            </ul>
          </div>
          <hr />
          <p className="text-center card-text fs-5">
            <strong>Precio:</strong> ${formattedPrice}
          </p>
          <div className="d-flex justify-content-between">
            <Link to={`/pizza/${id}`}>
              <Button
                label="Ver más"
                bgColor="light"
                textColor="dark"
                icon="eye"
              />
            </Link>
            <Button 
              label="Añadir" 
              bgColor="dark"
              textColor="light"
              icon="shopping-cart"
              onClick={() => {
                handleAddToCart()
                alert("Pizza " + name + " agregada con éxito")
              }}
            />
          </div>
        </div>
    </div>
  )
}

export default CardPizza