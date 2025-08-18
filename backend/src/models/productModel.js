import pool from '../../db/config.js'

export const getProductsModel = async () => {
  const sqlQuery = 'SELECT * FROM PRODUCTS'
  const response = await pool.query(sqlQuery)
  console.log(response.rows)
  return response.rows
}

export const createProductModel = async (name , image, detail) => {
  const sqlQuery = {
    text: 'INSERT INTO PRODUCTS (name, image, detail) values ($1,$2,$3) RETURNING *',
    values: [name, image, detail]
  }
  const result = await pool.query(sqlQuery)
  console.log('Product agregado', result)
  return result.rows
}

export const deleteProductModel = async (id) => {
  const sqlQuery = {
    text: 'DELETE FROM PRODUCTS WHERE id = $1 RETURNING *',
    values: [id]
  }
  const result = await pool.query(sqlQuery)
  console.log('Product eliminado', result)
  return result.rows
}

export const likeProductModel = async (user_id, product_id) => {
  let userFavoritesId;

  // Buscar la lista de favoritos del usuario
  const findFavorites = await pool.query({
    text: 'SELECT id FROM UserFavorites WHERE user_id = $1',
    values: [user_id]
  });

  if (findFavorites.rows.length === 0) {
    const createFavorites = await pool.query({
      text: 'INSERT INTO UserFavorites (user_id) VALUES ($1) RETURNING id',
      values: [user_id]
    });
    userFavoritesId = createFavorites.rows[0].id;
  } else {
    userFavoritesId = findFavorites.rows[0].id;
  }

  // Revisar si el producto ya está en favoritos
  const checkFavorite = await pool.query({
    text: 'SELECT * FROM FavoriteItems WHERE user_favorite_id = $1 AND product_id = $2',
    values: [userFavoritesId, product_id]
  });

  if (checkFavorite.rows.length > 0) {
    // Si ya existe, eliminarlo (unlike)
    await pool.query({
      text: 'DELETE FROM FavoriteItems WHERE user_favorite_id = $1 AND product_id = $2',
      values: [userFavoritesId, product_id]
    });
    return { removed: true, product_id };
  } else {
    // Si no existe, insertarlo (like)
    const insertFavoriteItem = await pool.query({
      text: 'INSERT INTO FavoriteItems (user_favorite_id, product_id) VALUES ($1, $2) RETURNING *',
      values: [userFavoritesId, product_id]
    });
    return { added: true, favorite: insertFavoriteItem.rows[0] };
  }
};
