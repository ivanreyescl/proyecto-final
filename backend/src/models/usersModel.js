import pool from "../../db/config"
import bcrypt from "bcrypt"

export const getUserModel = async (email) => {
  const sqlQuery = {
    text: 'SELECT email, first_name, last_name FROM Users WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(sqlQuery)
  console.log(response.rows)
  return response.rows
}

export const registerUserModel = async (email, password, first_name, last_name) => {
  const hashedPassword = bcrypt.hashSync(password)
  const SQLquery = {
    text: 'INSERT INTO Users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING email, first_name, last_name',
    values: [email, hashedPassword, first_name, last_name]
  }

  const response = await pool.query(SQLquery)
  return response.rows[0]
}