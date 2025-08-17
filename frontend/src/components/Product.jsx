import { useContext } from 'react'
import CardProduct from "./CardProduct.jsx"
import { CardProductDetailed } from "./CardProduct.jsx"
import { ProductContext } from "../context/ProductsContext.jsx"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import { UserContext } from "../context/UserContext";


const Product = () => {
    const { product, loading } = useContext(ProductContext)
    const { id } = useParams();
    const { role } = useContext(UserContext)

    if (loading) return <p>Cargando products...</p>;

    if (id) {
        const normalizedId = parseInt(id)
        const selectedProduct = product?.find((p) => p.id === (normalizedId))
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
                    category={selectedProduct.category_name}
                />
                </div>
            </div>
            </div>
        );
    }

    return (
        <div>
            <div className="container mt-5 d-flex justify-content-between align-items-center">
                {role == "Administrador" ? (
                    <Link to={`/products/new`}>
                        <Button
                            label="Agregar Producto"
                            icon="fa fa-plus"
                        />
                    </Link>
                ) : null}
            </div>   
            <div className="container mt-4">
                <div className="row">
                    {product &&
                    [...product]
                        .sort((a, b) => a.category_name.localeCompare(b.category))
                        .map((p, index) => (
                            <div key={index} className="col-md-6 col-sm-6 col-12 mb-4">
                                <CardProduct
                                    id={p.id}
                                    name={p.name}
                                    price={p.price}
                                    detail={p.detail}
                                    ingredients={p.ingredients}
                                    image={p.image}
                                    category={p.category_name}
                                />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Product;