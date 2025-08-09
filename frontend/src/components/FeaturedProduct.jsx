import { Link } from 'react-router-dom';
import Button from './Button';
import { useAddToCart } from '../hooks/addToCart';
import "./FeaturedProduct.css";

const FeaturedProduct = ({ id, name, price, image, detail, category }) => {
    const capitalizedName = name.split(' ')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ');
    const addToCartHandler = useAddToCart();

    const formattedPrice = price.toLocaleString();

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
