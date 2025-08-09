import { useEffect, useState, createContext } from "react"

export const ProductContext = createContext()  

const ProductsProvider = ({ children }) => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const ENV_URL = 'http://localhost:5000/products'

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
    
    // TODO: Estas acciones las debe manejar el backend, solo se agregaron para mostrar el funcionamiento de las vistas.
    const register = async ({ name, detail, code, price, image, category }) => {
        // TODO: Se debe habilitar el registro de imágenes en una nube, de momento arroja una imagen random
        image = "https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000);
        try {
            const response = await fetch(ENV_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, detail, code, price, image, category }),
            });
            if (!response.ok) throw new Error("Error al registrar el producto");
            await fetchProductsFromApi();
            return true;
        } catch (error) {
            console.error(error);
        return false;
        }
    };

    const update = async (id, updatedProduct) => {
        // TODO: Se debe habilitar el registro de imágenes en una nube, de momento arroja una imagen random
        image = "https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000);

        try {
            const response = await fetch(`${ENV_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) throw new Error('Error al actualizar');
            await fetchProductsFromApi();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
    ///

    useEffect(() => {
        fetchProductsFromApi()
    }, [])

    return (
        <ProductContext.Provider value={{ product, loading, fetchProductsFromApi, register, update }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductsProvider
