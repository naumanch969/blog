import { Schema, model } from 'mongoose'

const categorySchema = Schema({
    name: { type: String, required: true, },
}, { timestamps: true })

const categoryModel = model('Category', categorySchema)
export default categoryModel;