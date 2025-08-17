import { useContext } from 'react';
import { toast } from 'react-toastify';
import { FavoriteContext } from '../context/FavoriteContext';
import { urlBaseServer } from '../server_config';

export const useAddToFavorite = () => {
  const { toggleFavorite } = useContext(FavoriteContext);

  const handleLike = async (product, e) => {
    if (e) e.preventDefault();
    try {
      const response = await fetch(`${urlBaseServer}/products/like/${product.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error al dar like al producto');
      }

      toggleFavorite(product); // sincronizamos con el contexto
      toast.success('Producto agregado a favoritos');
    } catch (error) {
      toast.error('No se pudo agregar a favoritos');
      console.error(error);
    }
  };

  return { handleLike };
};
