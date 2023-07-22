import Category from '../models/category.js'

// Get All Categorys
export const getAllCategories = async (req, res) => {
    try {
        let categories = await Category.find()
        return res.status(200).json({ result: categories, message: 'categories fetched successfully!', success: true })
    } catch (error) {
        console.log(`error in getAllCategories = \n`, error)
        res.status(404).json({ message: 'error in register - controllers/category.js', error, success: false })
    }
}

// create category
export const createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body)
        res.status(200).json({ message: 'category created successfully!', success: true, result: newCategory })
    } catch (error) {
        console.log(`error in createCategory = \n`, error)
        res.status(404).json({ message: 'error in createCategory - controllers/category.js', error, success: false })
    }
}