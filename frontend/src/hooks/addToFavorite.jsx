import { useContext } from 'react';
import { toast } from 'react-toastify';
import { FavoriteContext } from '../context/FavoriteContext';
import { urlBaseServer } from '../server_config';

export const useAddToFavorite = () => {
  const { addToFavorite, removeFavorite, favorites } = useContext(FavoriteContext);

  const handleLike = async (product, e) => {
    if (e) e.preventDefault();
    try {
      const isFavorite = favorites?.some(fav => fav.id === product.id);

      if (!isFavorite) {
        await addToFavorite(product.id, 1);
        toast.success('Producto agregado a favoritos');
      } else {
        const favItem = favorites.find(fav => fav.id === product.id);
        if (favItem) {
          await removeFavorite(favItem.favoriteItemId);
          toast.warning('Producto eliminado de favoritos');
        }
      }
    } catch (error) {
      toast.error('No se pudo actualizar favoritos');
      console.error(error);
    }
  };

  return { handleLike };
};
