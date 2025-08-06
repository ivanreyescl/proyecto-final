import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from 'react-router-dom';
import Button from './Button'

const CardProduct = ({ id, name, price, image, description, category }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    console.log(id, name)
    const ProductToAdd = { id, name, price, image, description, category }
    addToCart(ProductToAdd)
  }
  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="card shadow-sm">
      <Link to={`/Product/${id}`}>
        <img src={image} style={{ maxWidth: "300px", width: "100%", height: "auto" }} 
          className="mwcard-img-top align-self-center pt-3"  
          alt={name}
        />  
      </Link>    
        <div className="card-body">
          <h5 className="text-left card-title fw-bold">{capitalizedName}</h5>
          <hr />
          <div className="card-text d-flex flex-column justify-content-center">
            {description && <p className="text-center text-secondary">{description}</p>}
          </div>
          <hr />
          <p className="text-center card-text fs-5">
            <strong>Precio:</strong> ${formattedPrice}
          </p>
          <div className="d-flex justify-content-between">
            
            <Button 
              label="Añadir" 
              bgColor="dark"
              textColor="light"
              icon="shopping-cart"
              onClick={() => {
                handleAddToCart()
                alert("Product " + name + " agregada con éxito")
              }}
            />
          </div>
        </div>
    </div>
  )
}

export default CardProduct