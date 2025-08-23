import { useContext } from "react"
import { Link } from 'react-router-dom';
import Button from './Button'
import "./CardProduct.css"
import { useAddToCart } from "../hooks/addToCart";
import { UserContext } from "../context/UserContext";
import { ProductContext } from "../context/ProductsContext";
import Swal from 'sweetalert2';
import { useAddToFavorite } from "../hooks/addToFavorite";
import { FavoriteContext } from "../context/FavoriteContext";

const CardProduct = ({ id, name, price, image, detail, category }) => {
  const addToCartHandler = useAddToCart();
  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="card cardproduct shadow-sm">
      <Link to={`/products/${id}`}>
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


const CardProductDetailed = ({ id, name, price, image, detail, category, stock }) => {
  const { role } = useContext(UserContext)
  const formattedPrice = price.toLocaleString()
  const capitalizedName = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  const addToCartHandler = useAddToCart();
  const { handleLike } = useAddToFavorite();
  const { favorites } = useContext(FavoriteContext);
  const { token } = useContext(UserContext);

  const isFavorite = favorites ? favorites.some(fav => fav.id === id) : false;

  const { deleteProduct } = useContext(ProductContext);

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará el producto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

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
        <div className="card-text d-flex text-left flex-column justify-content-start">
          <span className={`badge ${stock > 0 ? 'bg-success' : 'bg-secondary'}`}>
                {stock > 0 ? `Quedan: ${stock} !` : 'Agotado'}
          </span>
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
            <button
                className="favorite-item"
                onClick={(e) => handleLike({ id, name, price, image, detail, category }, e)}
                style={{ background: 'none', border: 'none', padding: 0, display: token ? 'block' : 'none' }}
            >
                <i className={`fa${isFavorite ? 's' : 'r'} fa-heart`}></i>
            </button>
          </div>
          <div className="container mt-5 d-flex justify-content-between align-items-center">
            <Button 
              label="Agregar al carrito"
              icon="fa fa-cart-plus" 
              onClick={() => addToCartHandler({ id, name, price, image, detail, category })}
            />
            {role === 'Administrador' ? (
              <>
                <Link to={`/products/edit/${id}`}>
                  <Button
                    icon="fa fa-cog"
                    label="Modificar Producto"
                  />
                </Link>
                <Button
                  icon="fa fa-trash"
                  label="Eliminar Producto"
                  onClick={handleDelete}
                />
              </>
            ) : null}
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