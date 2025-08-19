
import { registerUserModel, getUserModel, loginModel } from '../models/usersModel.js'


export const getUser = async (req, res) => {
  try {
    const email = req.user
    const user = await getUserModel(email)
    res.json({ user })
  } catch (error) {
    res.json({ error: 'Error al procesar la solicitud' })
  }
}

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
      firstName: user.first_name, // <-- mapeo correcto
      lastName: user.last_name,   // <-- mapeo correcto
      role_description: user.role_description || '',
      // agrega otros campos si necesitas
    };

    res.json({ message: 'Inicio de sesión exitoso', user: userFrontend });
  } catch (error) {
    console.error('Error =>', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
};
