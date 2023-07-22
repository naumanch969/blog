import { Schema, model } from 'mongoose'

const contactSchema = Schema({
    name: String,
    message: String,
    email: String,
    subject: String
}, { timestamps: true })

const contactModel =  model('contact', contactSchema)
export default contactModel