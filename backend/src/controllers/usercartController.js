
import { getUserCartModel, addCartItemModel, updateCartItemModel, deleteCartItemModel } from '../models/usercartModel.js'

export const getUserCart = async (req, res) => {
  try {
    const id = req.params.user_id
    const cart = await getUserCartModel(id)
    res.json({ cart })
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
  }
}

export const addCartItem = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || quantity < 1) {
      return res.status(400).json({ error: 'Datos incompletos o inválidos' });
    }

    const newCartItem = await addCartItemModel(user_id, product_id, quantity);
    res.status(201).json({ message: 'CartItem agregado', cartItem: newCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el CartItem' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: 'La cantidad debe ser al menos 1' });
    }

    const updatedCartItem = await updateCartItemModel(cart_item_id, quantity);

    if (!updatedCartItem) {
      return res.status(404).json({ error: 'CartItem no encontrado' });
    }

    res.json({ message: 'Cantidad actualizada', cartItem: updatedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el CartItem' });
  }
};

export const replaceCartItem = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || quantity < 1) {
      return res.status(400).json({ error: 'Datos incompletos o inválidos' });
    }

    const updatedCartItem = await updateCartItemModel(cart_item_id, quantity, product_id);

    if (!updatedCartItem) {
      return res.status(404).json({ error: 'CartItem no encontrado' });
    }

    res.json({ message: 'CartItem reemplazado', cartItem: updatedCartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al reemplazar el CartItem' });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { cart_item_id } = req.params;
    const deleted = await deleteCartItemModel(cart_item_id);

    if (!deleted) {
      return res.status(404).json({ error: 'CartItem no encontrado' });
    }

    res.json({ message: 'CartItem eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el CartItem' });
  }
};

