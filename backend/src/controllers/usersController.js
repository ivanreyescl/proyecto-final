import { createUserModel, getUserModel } from '../models/usersModel.js'

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
    const user = await createUserModel(email, password, first_name, last_name)
    res.status(201).json({ message: 'Usuario creado correctamente', user })
  } catch (error) {
    console.log(error)
  }
}
