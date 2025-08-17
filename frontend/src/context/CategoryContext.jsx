import { useEffect, useState, createContext } from "react";
import { urlBaseServer } from "../server_config";

export const CategoryContext = createContext();

const CategoriesProvider = ({ children }) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const ENV_URL = `${urlBaseServer}/categories`;

    const fetchCategoriesFromApi = async () => {
        try {
            const response = await fetch(ENV_URL);
            const data = await response.json();
            const normalizedData = data.categories;
            setCategory(normalizedData);
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
        <CategoryContext.Provider value={{ category, loading }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoriesProvider;
