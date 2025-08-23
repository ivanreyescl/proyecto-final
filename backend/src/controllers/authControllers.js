import { findUserByEmailModel } from '../models/usersModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await findUserByEmailModel(email)
    if (!user) {
      return res.status(401)
        .json({ message: 'no autorizado' })
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'no autorizado' })
    }

    const token = jwt.sign({ email }, process.env.JWTSECRET, {
      expiresIn: '120s'
    })
    return res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { loginUser }
