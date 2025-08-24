import { useEffect, useState, createContext } from "react"
import { urlBaseServer } from "../server_config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const ProductContext = createContext()

const ProductsProvider = ({ children }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const ENV_URL = `${urlBaseServer}/products`

    const fetchProductsFromApi = async () => {
    try {
        const response = await fetch(ENV_URL)
        const data = await response.json()
        const normalizedData = data.products
        setProduct(normalizedData)
    } catch (error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
}

    const register = async (createdProduct) => {
        // TODO: Se debe habilitar el registro de imágenes en una nube, de momento arroja una imagen random
        createdProduct.image = "https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000);
        try {
            const response = await fetch(`${urlBaseServer}/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createdProduct),
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
            const response = await fetch(`${ENV_URL}/update/${id}`, {
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

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${ENV_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar el producto');
            toast.success("Producto eliminado correctamente", { autoClose: 2000 });

            navigate("/products");
            await fetchProductsFromApi();
            return true;
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar el producto");
            return false;
        }
    };
    ///

    useEffect(() => {
        fetchProductsFromApi()
    }, [])

    return (
        <ProductContext.Provider value={{
            product,
            loading,
            fetchProductsFromApi,
            register,
            update,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductsProvider