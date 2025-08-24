
import { registerUserModel, getUserModel, loginModel,getAllUsersModel, updateUserRoleModel,deleteUserModel } from '../models/usersModel.js'
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
  try {
    const email = req.user
    const user = await getUserModel(email)
    res.json({ user })
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersModel()
    res.json({ users })
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
  }
}

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_id } = req.body;
    const updatedUser = await updateUserRoleModel(id, role_id);
    res.json({ user: updatedUser });
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserModel(id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body
    const user = await registerUserModel(email, password, first_name, last_name)
    res.status(201).json({ message: 'Usuario creado correctamente', user })
  } catch (error) {
    console.log(error)
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginModel(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const userFrontend = {
      id: user.id,
      email: user.email,
      first_name: user.first_name, // <-- mapeo correcto
      last_name: user.last_name,     // <-- mapeo correcto
      role_description: user.role_description || '',
    };

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: 'Inicio de sesión exitoso', user: userFrontend, token });
  } catch (error) {
    console.error('Error =>', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};
