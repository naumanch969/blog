import { Schema, model } from 'mongoose'

const userSchema = Schema({
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    image: { type: String, default: '' },
    detail: { type: String, default: '' },
}, { timestamps: true })

const userModel = model('User', userSchema)
export default userModel;