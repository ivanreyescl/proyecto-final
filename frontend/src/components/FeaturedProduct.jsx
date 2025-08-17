import { Link } from 'react-router-dom';
import Button from './Button';
import { useAddToCart } from '../hooks/addToCart';
import "./FeaturedProduct.css";
import { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
import { useAddToFavorite } from '../hooks/addToFavorite';
import { UserContext } from '../context/UserContext';


const FeaturedProduct = ({ id, name, price, image, detail, category }) => {
    const capitalizedName = name.split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
    const addToCartHandler = useAddToCart();

    const formattedPrice = price.toLocaleString();

    const { favorites } = useContext(FavoriteContext);
    const { handleLike } = useAddToFavorite();

    const isFavorite = favorites ? favorites.some(fav => fav.id === id) : false;

    const { token } = useContext(UserContext);

    return (
        <div className="card shadow-sm featured-card">
            <Link to={`/products/${id}`}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={image}
                        className="card-featured-img"
                        alt={name}
                    />
                </div>
                <div className="price-badge">
                    <span>${formattedPrice} CLP</span>
                </div>
            </Link>
            <button
                className="favorite-item"
                onClick={(e) => handleLike({ id, name, price, image, detail, category }, e)}
                style={{ background: 'none', border: 'none', padding: 0, display: token ? 'block' : 'none' }}
            >
                <i className={`fa${isFavorite ? 's' : 'r'} fa-heart`}></i>
            </button>
            <div className="card-body">
                <h5 className="text-center card-title fw-bold fs-2">{capitalizedName}</h5>
                <p className="text-center text-muted small mb-1">{detail}</p>
                <p className="text-center text-secondary small">{category}</p>
                <hr />
                <div className="d-flex justify-content-between">
                    <Button 
                        label="Ver más" 
                        link={`/products/${id}`}
                    />
                    <Button 
                        label="Agregar al carrito" 
                        onClick={() => addToCartHandler({ id, name, price, image, detail, category })}
                    />
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;
