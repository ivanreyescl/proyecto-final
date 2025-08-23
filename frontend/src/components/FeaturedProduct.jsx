import { Link } from 'react-router-dom';
import Button from './Button';
import { useAddToCart } from '../hooks/addToCart';
import "./FeaturedProduct.css";
import { useContext, useRef } from 'react';
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

// Carousel using Bootstrap CDN

const Carousel = ({ products }) => {
    const carouselId = useRef(`carousel-${Math.random().toString(36).substr(2, 9)}`);

    return (
        <div id={carouselId.current} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {products.map((product, idx) => (
                    <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={product.id}>
                        <SlideProduct product={product} />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId.current}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" style={{ filter: 'invert(1)' }} aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId.current}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" style={{ filter: 'invert(1)' }} aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

const SlideProduct = ({ product }) => {
    const { id, name, image, category_name } = product;
    const capitalizedName = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="slide-product text-center">
            <Link to={`/products/${id}`}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={image}
                        className="card-carousel-img"
                        alt={name}
                    />
                </div>
            </Link>
            <h1 className="mt-2 fw-bold">{capitalizedName}</h1>
            <h5 className="mt-2 ">{category_name}</h5>
        </div>
    );
};

export default FeaturedProduct;
export { SlideProduct, Carousel };