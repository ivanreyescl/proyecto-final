import { useEffect, useState, createContext } from "react"

export const ProductContext = createContext()  

const ProductsProvider = ({ children }) => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const ENV_URL = 'https://68929763c49d24bce867df99.mockapi.io/products'

    const fetchProductsFromApi = async () => {
    try {
        const response = await fetch(ENV_URL)
        const data = await response.json()
        const normalizedData = Array.isArray(data[0]) ? data[0] : data
        setProduct(normalizedData)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
    }

    useEffect(() => {
        fetchProductsFromApi()
    }, [])

    return (
        <ProductContext.Provider value={{ product, loading, fetchProductsFromApi }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductsProvider
