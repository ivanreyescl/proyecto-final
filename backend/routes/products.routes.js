import { Router } from 'express'

import { createProduct, getAllProducts, deleteProduct, likeProduct, updateProduct } from '../src/controllers/productsController.js'

const router = Router()

router.get('/products', getAllProducts)
router.post('/product', createProduct)
router.put('/products/like/:id', likeProduct)
router.put('/products/update/:id', updateProduct)
router.delete('/products/:id', deleteProduct)


export default router
