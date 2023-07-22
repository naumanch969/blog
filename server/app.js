import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import userRoutes from './routes/user.js'
import blogRoutes from './routes/blog.js'
import contactRoutes from './routes/contact.js'
import categoryRoutes from './routes/category.js'

dotenv.config()
const app = express()
const mongooseURL = process.env.COMPASS_URL
// const mongooseURL = process.env.ATLAS_URL
const port = process.env.PORT

app.use(cors())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' })); // define the size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));	// define the size limit
app.use(bodyParser.json())

app.use('/user', userRoutes);
app.use('/blog', blogRoutes);
app.use('/category', categoryRoutes);
app.use('/contact', contactRoutes);

app.get('/', (req, res) => res.status(200).json({ message: 'App is Working' }))


mongoose.connect(mongooseURL)
    .then(() => app.listen(port, () => console.log('listening at the port ', port)))
    .catch((error) => console.log('error in connecting to mongoDB = \n', error))