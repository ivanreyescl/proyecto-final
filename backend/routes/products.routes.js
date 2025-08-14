import { Router } from 'express'

import { createProduct, getAllProducts, deleteProduct, likeProduct } from '../src/controllers/productsController.js'

const router = Router()

router.get('/products', getAllProducts)
router.post('/product', createProduct)
router.put('/products/like/:id', likeProduct)
router.delete('/products/:id', deleteProduct)


export default router
