import { getCategoriesModel} from '../models/categoriesModel.js'

export const getAllCategories = async (req, res) => {
    try {
        const categories = await getCategoriesModel() 
        res.json({ categories })
    } catch (error) {
        res.json({ error: 'Error al procesar la solicitud' })
    }
}