import { useContext } from 'react'
import { SlideProduct } from '../components/FeaturedProduct';
import { ProductContext } from "../context/ProductsContext"

const Product = () => {
    const { product, loading } = useContext(ProductContext)

    if (loading) return <p>Cargando products...</p>;

    return (
        <>
        <div className="container mt-6">
            <div className="row">
                <h2 className="text-left fw-bold p-1">Productos Destacados</h2>
            </div>
            <div className="row">
                {product && shuffleArray(product).slice(0,2).map((p, index) => (
                    <div key={index} className="col-md-6 col-sm-6 col-12 mb-4">
                        <FeaturedProduct
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            detail={p.detail}
                            image={p.image}
                            category={p.category_name}
                        />
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Product;