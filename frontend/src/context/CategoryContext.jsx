import { useEffect, useState, createContext } from "react";
import { urlBaseServer } from "../server_config";

export const CategoryContext = createContext();

const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const ENV_URL = `${urlBaseServer}/categories`;

    const fetchCategoriesFromApi = async () => {
        try {
            const response = await fetch(ENV_URL);
            const data = await response.json();
            const normalizedData = data.categories;
            setCategories(normalizedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoriesFromApi();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoriesProvider;
