import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { Link } from 'react-router-dom';
import Button from './Button'
import "./CardProduct.css"
import { useAddToCart } from "../hooks/addToCart";

const CardProduct = ({ id, name, price, image, detail, category }) => {
  const addToCartHandler = useAddToCart();
  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="card cardproduct shadow-sm">
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
              onClick={() => addToCartHandler({ id, name, price, image, detail, category })}
            />
        </div>
    </div>
  )
}

const CardProductDetailed = ({ id, name, price, image, detail, category }) => {
  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const addToCartHandler = useAddToCart();

  return (
    <div className="card cardproduct shadow-sm">
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
          <div className="container mt-5 d-flex justify-content-between align-items-center">
            <Button 
              label="Agregar al carrito"
              icon="fa fa-cart-plus" 
              onClick={() => addToCartHandler({ id, name, price, image, detail, category })}
            />
            {/* TODO: Este botón SOLO debe estar disponible para administradores */}
            <Link to={`/products/edit/${id}`}>
                <Button 
                    icon="fa fa-cog"
                    label="Modificar Producto" 
                />
            </Link>
            <Link to="/products">
                <Button label="Volver" icon="fa fa-arrow-left" />
            </Link> 
          </div>  
        </div>
    </div>
  )
}

export default CardProduct
export { CardProductDetailed }