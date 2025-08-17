import { getProductsModel, createProductModel, deleteProductModel, likeProductModel } from '../models/productModel.js'

export const getAllProducts = async (req, res) => {
  try {
    const products = await getProductsModel() 
    res.json({ products })
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body
    const newProduct = await createProductModel(titulo, img, descripcion)
    res.json({ product: newProduct })
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
    console.error('Error =>', error)
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await deleteProductModel(id)
    if (deleted) {
      res.json({ message: 'Product eliminado correctamente' })
    } else {
      res.status(404).json({ error: 'Product no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la solicitud' })
    console.error('Error =>', error)
  }
}

export const likeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await likeProductModel(1, id);

    if (result.added) {
      res.json({ message: 'Producto agregado a favoritos', favorite: result.favorite });
    } else if (result.removed) {
      res.json({ message: 'Producto eliminado de favoritos', product_id: result.product_id });
    } else {
      res.status(400).json({ error: 'No se pudo procesar la acción' });
    }

  } catch (error) {
    console.error('Error =>', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};
