import { useContext } from 'react'
import CardProduct from "../components/CardProduct"
import { CardProductDetailed } from "../components/CardProduct"
import { ProductContext } from "../context/ProductsContext"
import { useParams } from 'react-router-dom'

const Product = () => {
    const { product, loading } = useContext(ProductContext)
    const { id } = useParams();

    if (loading) return <p>Cargando products...</p>;

    if (id) {
        const selectedProduct = product?.find((p) => p.id === Number(id))

        if (!selectedProduct) return <p>Producto no encontrado</p>

        return (
            <div className="container mt-6">
            <div className="row">
                <div className="col-12">
                <CardProductDetailed
                    id={selectedProduct.id}
                    name={selectedProduct.name}
                    price={selectedProduct.price}
                    ingredients={selectedProduct.ingredients}
                    image={selectedProduct.image}
                    detail={selectedProduct.detail}
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
                    <div key={index} className="col-md-6 col-sm-6 col-12 mb-4">
                        <CardProduct
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            detail={p.detail}
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