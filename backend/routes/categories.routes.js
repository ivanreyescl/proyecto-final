import { Router } from 'express'

import { getAllCategories } from '../src/controllers/categoriesController.js'

const router = Router()

router.get('/categories', getAllCategories)


export default router
