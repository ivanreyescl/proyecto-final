import { useContext } from 'react'
import CardProduct from "../components/CardProduct"
import { ProductContext } from "../context/ProductsContext"
import { useParams } from 'react-router-dom'

const Product = () => {
    const { product, loading } = useContext(ProductContext)
    const { id } = useParams();

    if (loading) return <p>Cargando products...</p>;

    if (id) {
        const selectedProduct = product?.find((p) => p.id === id)
        return (
            <div className="container mt-2">
                <div className="row">
                    <div className="col-12">
                        <CardProduct
                            id={selectedProduct.id}
                            name={selectedProduct.name}
                            price={selectedProduct.price}
                            ingredients={selectedProduct.ingredients}
                            image={selectedProduct.image}
                            description={selectedProduct.desc}
                            category={selectedProduct.category}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {product && product.map((p, index) => (
                    <div key={index} className="col-md-4 col-sm-6 col-12 mb-4">
                        <CardProduct
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