import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from 'react-router-dom';
import Button from './Button'
import "./CardProduct.css"

const CardProduct = ({ id, name, price, image, detail, category }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    console.log(id, name)
    const ProductToAdd = { id, name, price, image, detail, category }
    addToCart(ProductToAdd)
  }
  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="card shadow-sm">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          className="card-img-top"
          alt={name}
        />
      </Link>    
        <div className="card-body">
          <h5 className="text-left card-title fw-bold fs-2">{capitalizedName}</h5>
          <hr />
          <div className="card-text d-flex flex-column justify-content-center">
            {detail && <p className="text-left fw-bold">{detail}</p>}
          </div>
          <div className="card-text d-flex flex-column justify-content-center">
            {category && <p className="text-left text-secondary">{category}</p>}
          </div>
          <p className="text-left card-text fs-5">
            <strong> ${formattedPrice} CLP</strong>
          </p>
          <hr />
            <Button 
              label="Agregar al carrito" 
              onClick={() => {
                handleAddToCart()
                alert("Product " + name + " agregada con éxito")
              }}
            />
        </div>
    </div>
  )
}


const FeaturedProduct = ({ id, name, price, image, description, category }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    const ProductToAdd = { id, name, price, image, description, category }
    addToCart(ProductToAdd)
  }
  return (
    <div className="card shadow-sm">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          className="card-img-top"
          alt={name}
        />
      </Link>    
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <Button 
              label="Ver más" 
              link={`/product/${id}`}
            />
            <Button 
              label="Agregar al carrito" 
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


const CardProductDetailed = ({ id, name, price, image, detail, category }) => {
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = () => {
    console.log(id, name)
    const ProductToAdd = { id, name, price, image, detail, category }
    addToCart(ProductToAdd)
  }
  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="card shadow-sm">
      <h5 className="text-center card-title fw-bold fs-2">{capitalizedName}</h5>
      <hr />
        <div className="card-text d-flex flex-column justify-content-center align-items-center">
          <img
            src={image}
            className="card-img-top-single "
            alt={name}
          />
        </div>  
        <div className="card-body card-text d-flex flex-column justify-content-center">
          <hr />
          <div className="card-text d-flex flex-column justify-content-center">
            {detail && <p className="text-left fw-bold">{detail}</p>}
          </div>
          <div className="card-text d-flex flex-column justify-content-center">
            {category && <p className="text-left text-secondary">{category}</p>}
          </div>
          <p className="text-left card-text fs-5">
            <strong> ${formattedPrice} CLP</strong>
          </p>
          <hr />
            <Button 
              label="Agregar al carrito" 
              onClick={() => {
                handleAddToCart()
                alert("Product " + name + " agregada con éxito")
              }}
            />
        </div>
    </div>
  )
}

export default CardProduct
export { FeaturedProduct, CardProductDetailed }