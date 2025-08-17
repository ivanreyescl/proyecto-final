import pool from '../../db/config.js'

export const getCategoriesModel = async () => {
  const sqlQuery = 'SELECT * FROM CATEGORIES'
  const response = await pool.query(sqlQuery)
  console.log(response.rows)
  return response.rows
}
