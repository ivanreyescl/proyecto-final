import { findUserByEmailModel } from '../src/models/usersModel.js'

const createUserMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Correo e obligatorio.' })
    }
    const user = await findUserByEmailModel(email)
    if (user) {
      return res.status(400).json({ message: 'Usuario existente.' })
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Problemita al procesar solicitud' })
  }
}

export { createUserMiddleware }
