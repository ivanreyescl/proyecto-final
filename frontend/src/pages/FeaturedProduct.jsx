import { useContext } from 'react'
import { FeaturedProduct }  from "../components/CardProduct"
import { ProductContext } from "../context/ProductsContext"

const Product = () => {
    const { product, loading } = useContext(ProductContext)

    if (loading) return <p>Cargando products...</p>;

    return (
        <div className="container mt-6">
            <div className="row">
                {product && product.slice(0, 2).map((p, index) => (
                    <div key={index} className="col-md-6 col-sm-6 col-12 mb-4">
                        <FeaturedProduct
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            ingredients={p.ingredients}
                            image={p.image}
                            category={p.category}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;