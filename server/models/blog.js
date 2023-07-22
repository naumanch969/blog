import { Schema, model } from 'mongoose'

const blogSchema = Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    username: { type: String, required: true },
    categories: { type: Array, required: false },
}, { timestamps: true })

const blogModel = model('Blog', blogSchema)
export default blogModel;