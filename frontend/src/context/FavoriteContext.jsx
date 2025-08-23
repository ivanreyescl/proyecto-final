import { createContext, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { urlBaseServer } from "../server_config";
import { toast } from 'react-toastify';

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const { userId, token } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  const returnSuccess = (message) => toast.success(message, { autoClose: 2000 });
  const returnAlert = (message) => toast.error(message, { autoClose: 2000 });

  const fetchFavorites = async () => {
    if (!userId || !token) return;
    try {
      const response = await fetch(`${urlBaseServer}/user/${userId}/favorite`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Error fetching favorites");
      const data = await response.json();
      const flattenedFavorites = (data?.favorite.favorite_items || []).map(item => ({
        favoriteItemId: item.favorite_item_id,
        id: item.product_id,
        quantity: item.quantity,
        ...item.product
      }));

      setFavorites(flattenedFavorites);
    } catch (error) {
      console.error(error);
      setFavorites([]);
    }
  };

  const addToFavorite = async (productId, quantity = 1) => {
    if (!userId || !token) return;
    try {
      const response = await fetch(`${urlBaseServer}/user/${userId}/favorite-items`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity })
      });
      const item = await response.json();
      await fetchFavorites();
      returnSuccess("Producto agregado a favoritos");
      return item;
    } catch (error) {
      console.error(error);
      returnAlert("Error al agregar a favoritos");
      return null;
    }
  };

  const removeFavorite = async (favoriteItemId) => {
    if (!userId || !token) return;
    try {
      await fetch(`${urlBaseServer}/favorite-items/${favoriteItemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchFavorites();
      returnSuccess("Producto eliminado de favoritos");
    } catch (error) {
      console.error(error);
      returnAlert("Error al eliminar favorito");
    }
  };

  const updateFavoriteQuantity = async (favoriteItemId, quantity) => {
    if (!userId || !token) return;
    try {
      await fetch(`${urlBaseServer}/favorite-items/${favoriteItemId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ quantity })
      });
      await fetchFavorites();
      returnSuccess("Cantidad actualizada");
    } catch (error) {
      console.error(error);
      returnAlert("Error al actualizar cantidad");
    }
  };

  const total = favorites.reduce((acc, product) => acc + product.price * (product.quantity || 0), 0);

  return (
    <FavoriteContext.Provider value={{
      favorites,
      fetchFavorites,
      addToFavorite,
      removeFavorite,
      updateFavoriteQuantity
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
