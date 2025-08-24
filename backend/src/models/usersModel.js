
import pool from "../../db/config.js";
import bcrypt from "bcrypt"


export const getUserModel = async (email) => {
  const sqlQuery = {
    text: `
      SELECT
        u.id, u.email, u.password, u.first_name, u.last_name, u.inactive,
        ur.id AS user_role_id,
        ur.name AS user_role_name,
        r.id AS role_id,
        r.description AS role_description,
        r.superuser
      FROM Users u
      LEFT JOIN UserRoles ur ON ur.user_id = u.id
      LEFT JOIN Roles r ON r.id = ur.role_id
      WHERE u.email = $1
    `,
    values: [email]
  };

  const response = await pool.query(sqlQuery);
  return response.rows;
};

export const getAllUsersModel = async () => {
  const sqlQuery = {
    text: `
      SELECT
        u.id, u.email, u.first_name, u.last_name,
        ur.id AS user_role_id,
        ur.name AS user_role_name,
        r.id AS role_id,
        r.description AS role_description,
        r.superuser
      FROM Users u
      LEFT JOIN UserRoles ur ON ur.user_id = u.id
      LEFT JOIN Roles r ON r.id = ur.role_id
    `
  };

  const response = await pool.query(sqlQuery);
  return response.rows;
};

export const loginModel = async (email, password) => {
  const user = await getUserModel(email);
  if (user.length === 0) return null;

  const isValid = bcrypt.compareSync(password, user[0].password);
  if (!isValid) return null;
  const { password: _, ...userWithoutPassword } = user[0];
  return userWithoutPassword;
};

export const registerUserModel = async (email, password, first_name, last_name) => {
  const hashedPassword = bcrypt.hashSync(password, 10)
  const SQLquery = {
    text: 'INSERT INTO Users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING email, first_name, last_name',
    values: [email, hashedPassword, first_name, last_name]
  }

  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const findUserByEmailModel = async (email) => {
  const SQLquery = {
    text: 'SELECT * FROM Users WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}
