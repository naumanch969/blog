import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const query = req.query.new
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find()
        return res.status(200).json({ result: users, message: 'users fetched successfully!', success: true })
    } catch (error) {
        console.log(`error = \n`, error)
        res.status(404).json({ message: 'error in register - controllers/user.js', error, success: false })
    }
}

// Get User
export const getUser = async (req, res) => {
    try {
        const findedUser = await User.findById(req.params.id)
        if (!findedUser) return res.status(400).json({ message: 'user not exist', success: false })
        const { password, ...others } = findedUser._doc;
        return res.status(200).json({ result: { ...others }, message: 'user fetched successfully', success: true })
    } catch (error) {
        console.log(`error = \n`, error)
        res.status(404).json({ message: 'error in getUser - controllers/user.js', error, success: false })
    }
}


// User registration
export const register = async (req, res) => {
    try {
        const { username, email, password: input_password } = req.body
        if (!email || !username || !input_password) return res.status(400).json({ message: 'make sure to provide all the 4 fieds (username, email, password)', success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `Invalid email pattern!`, success: false })
 
        const users = await User.find({})
        const isEmailAlreadyExist = Boolean(users.find(user => user.email == email))
        if (isEmailAlreadyExist) return res.status(400).json({ message: `email already exist`, success: false })
    
        const hashedPassword = await bcrypt.hash(input_password, 12)
        const result = await User.create({ username, email, password: hashedPassword })

        const { password, ...others } = result
        return res.status(200).json({ result: { ...others._doc, tokens: [] }, message: 'register successfully', success: true })

    } catch (error) {
        console.log(`error = \n`, error)
        res.status(404).json({ message: 'error in register - controllers/user.js', error, success: false })
    }
}

// User login
export const login = async (req, res) => {
    try {
        const { email, password: input_password } = req.body
        if (!email || !input_password) return res.status(400).json({ message: 'make sure to provide all the 2 fieds (email, password)', success: false })
        if (!validator.isEmail(email)) return res.status(400).json({ message: `Invalid email pattern!`, success: false })
        const users = await User.find()
        const findedUser = users.find(user => user.email == email)
        if (!findedUser) return res.status(401).json({ message: `invalid email!`, success: false })
        let normalPassword = input_password;
        let hashedPassword = findedUser.password
        const isPasswordCorrect = await bcrypt.compare(normalPassword, hashedPassword)
        if (!isPasswordCorrect) return res.status(401).json({ message: `password incorrect!`, success: false })
        const token = jwt.sign({ id: findedUser._id, isAdmin: findedUser.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: `3d` })
        const { password, ...others } = findedUser._doc;
        return res.status(200).json({ result: { ...others, token }, message: 'login successfully', success: true })
    }
    catch (error) {
        console.log(`error = \n`, error)
        res.status(404).json({ message: 'error in login - controllers/user.js', error, success: false })
    }
}

// Update User
export const updateUser = async (req, res) => {
    try {
        const findedUser = await User.findById(req.params.id)
        if (!findedUser) return res.status(400).json({ message: 'user not exist', success: false })
        if (req.body.password) req.body.password = await bcrypt.hash(req.body.password, 12)

        const body = req.body
        delete body._id

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: body }, { new: true })
        return res.status(200).json({ result: updatedUser, message: 'user updated successfully!', success: true })
    } catch (error) {
        console.log(`error = \n`, error)
        return res.status(404).json({ message: 'error in updateUser - controllers/user.js', error, success: false })
    }
}

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const findedUser = await User.findById(req.params.id)
        if (!findedUser) return res.status(400).json({ message: 'user not exist', success: false })
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({ result: deletedUser, message: 'user deleted successfully!', success: true })
    } catch (error) {
        console.log(`error = \n`, error)
        res.status(404).json({ message: 'error in deleteUser - controllers/user.js', error, success: false })
    }
}