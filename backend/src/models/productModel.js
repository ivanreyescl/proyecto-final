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

export const likeProductModel = async (id) => {
  const sqlQuery = {
    // TODO: ADAPTAR A PRODUCT_LIKED Y LOGICA DE FAVORITOS DEL USUARIO.
    //text: 'UPDATE products SET likes = COALESCE(likes, 0) + 1 WHERE id = $1 RETURNING *',
    values: [id]
  }
  const result = await pool.query(sqlQuery)
  console.log('Product eliminado', result)
  return result.rows
}

