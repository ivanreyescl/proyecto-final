import './Header.css'
import { useContext } from 'react'
import { Carousel } from '../components/FeaturedProduct'
import { ProductContext } from '../context/ProductsContext'

const Header = () => {
    const { product, loading } = useContext(ProductContext)
    
    
    if (loading) return <p>Cargando productos...</p>;

    return (
        <>
            <header className="d-flex align-items-center text-center bg-white text-dark p-3">
                <div className="container">
                    <h1 className="h3">¡PC Components!</h1>
                    <span>¡Tenemos los mejores productos que podrás encontrar!</span>
                    
                    {product && (
                        <Carousel products={product.slice(0, 5)} />
                    )}

                    <hr/>
                </div>
            </header>
        </>
    )
}

export default Header