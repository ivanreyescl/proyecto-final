
import { getUserFavoriteModel, addFavoriteItemModel, updateFavoriteItemModel, deleteFavoriteItemModel } from '../models/userfavoriteModel.js'

export const getUserFavorite = async (req, res) => {
  try {
    const id = req.params.user_id
    const favorite = await getUserFavoriteModel(id)
    res.json({ favorite })
  } catch (error) {
    console.log(error)
    res.json({ error: 'Error al procesar la solicitud' })
  }
}

export const addFavoriteItem = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { productId, quantity } = req.body;
    console.log(req.body)
    if (!productId || quantity < 1) {
      return res.status(400).json({ error: 'Datos incompletos o inválidos' });
    }

    const newFavoriteItem = await addFavoriteItemModel(user_id, productId, quantity);
    res.status(201).json({ message: 'FavoriteItem agregado', favoriteItem: newFavoriteItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el FavoriteItem' });
  }
};

export const updateFavoriteItem = async (req, res) => {
  try {
    const { favorite_item_id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: 'La cantidad debe ser al menos 1' });
    }

    const updatedFavoriteItem = await updateFavoriteItemModel(favorite_item_id, quantity);

    if (!updatedFavoriteItem) {
      return res.status(404).json({ error: 'FavoriteItem no encontrado' });
    }

    res.json({ message: 'Cantidad actualizada', favoriteItem: updatedFavoriteItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el FavoriteItem' });
  }
};

export const replaceFavoriteItem = async (req, res) => {
  try {
    const { favorite_item_id } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || quantity < 1) {
      return res.status(400).json({ error: 'Datos incompletos o inválidos' });
    }

    const updatedFavoriteItem = await updateFavoriteItemModel(favorite_item_id, quantity, product_id);

    if (!updatedFavoriteItem) {
      return res.status(404).json({ error: 'FavoriteItem no encontrado' });
    }

    res.json({ message: 'FavoriteItem reemplazado', favoriteItem: updatedFavoriteItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al reemplazar el FavoriteItem' });
  }
};

export const removeFavoriteItem = async (req, res) => {
  try {
    const { favorite_item_id } = req.params;
    const deleted = await deleteFavoriteItemModel(favorite_item_id);

    if (!deleted) {
      return res.status(404).json({ error: 'FavoriteItem no encontrado' });
    }

    res.json({ message: 'FavoriteItem eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el FavoriteItem' });
  }
};

