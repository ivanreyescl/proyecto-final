import pool from '../../db/config.js'

export const getProductsModel = async () => {
  const sqlQuery = `
    SELECT 
      p.id,
      p.name,
      p.detail,
      p.code,
      p.price,
      p.stock,
      p.image,
      p.category_id,
      c.name AS category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
  `;
  
  const response = await pool.query(sqlQuery);
  return response.rows;
};

export const createProductModel = async (name, image, detail, price, stock, category) => {
  await pool.query(`
    SELECT setval(
      pg_get_serial_sequence('products', 'id'),
      COALESCE((SELECT MAX(id) FROM products), 0) + 1,
      false
    )
  `);

  const sqlQuery = {
    text: 'INSERT INTO products (name, image, detail, price, stock, category_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
    values: [name, image, detail, price, stock, category]
  };

  const result = await pool.query(sqlQuery);
  return result.rows[0];
};

export const deleteProductModel = async (id) => {
  const sqlQuery = {
    text: 'DELETE FROM PRODUCTS WHERE id = $1 RETURNING *',
    values: [id]
  }
  const result = await pool.query(sqlQuery)
  return result.rows
}

export const updateProductModel = async (id, name, image, detail, price, stock, category) => {
  const sqlQuery = {
    text: 'UPDATE PRODUCTS SET name = $1, image = $2, detail = $3, price = $4, stock = $5, category_id = $6 WHERE id = $7 RETURNING *',
    values: [name, image, detail, price, stock, category, id]
  }
  const result = await pool.query(sqlQuery)
  return result.rows
}

export const likeProductModel = async (user_id, product_id) => {
  let userFavoritesId;

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

  const checkFavorite = await pool.query({
    text: 'SELECT * FROM FavoriteItems WHERE user_favorite_id = $1 AND product_id = $2',
    values: [userFavoritesId, product_id]
  });

  if (checkFavorite.rows.length > 0) {
    await pool.query({
      text: 'DELETE FROM FavoriteItems WHERE user_favorite_id = $1 AND product_id = $2',
      values: [userFavoritesId, product_id]
    });
    return { removed: true, product_id };
  } else {
    const insertFavoriteItem = await pool.query({
      text: 'INSERT INTO FavoriteItems (user_favorite_id, product_id) VALUES ($1, $2) RETURNING *',
      values: [userFavoritesId, product_id]
    });
    return { added: true, favorite: insertFavoriteItem.rows[0] };
  }
};
