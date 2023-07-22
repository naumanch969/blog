import Blog from '../models/blog.js'

// Get All Blogs
export const getAllBlogs = async (req, res) => {
    try {
        const { username, category } = req.query;

        let blogs;

        if (username) {
            blogs = await Blog.find({ username })
        }
        else if (category) {
            blogs = await Blog.find({ categories: { $in: [category] } })
        }
        else if (username && category) {
            blogs = await Blog.find({ username, categories: { $in: [category] } })
        }
        else {
            blogs = await Blog.find()
        }

        return res.status(200).json({ result: blogs, message: 'blogs fetched successfully!', success: true })
    } catch (error) {
        console.log(`error in getAllBlogs = \n`, error)
        res.status(404).json({ message: 'error in register - controllers/blog.js', error, success: false })
    }
}

// Get Blog
export const getBlog = async (req, res) => {
    try {
        const findedBlog = await Blog.findById(req.params.id)
        if (!findedBlog) return res.status(400).json({ message: 'blog not exist', success: false })
        const { password, ...others } = findedBlog._doc;
        return res.status(200).json({ result: { ...others }, message: 'blog fetched successfully', success: true })
    } catch (error) {
        console.log(`error in getBlog = \n`, error)
        res.status(404).json({ message: 'error in getBlog - controllers/blog.js', error, success: false })
    }
}


// create blog
export const createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.status(200).json({ message: 'blog created successfully!', success: true, result: newBlog })
    } catch (error) {
        console.log(`error in createBlog = \n`, error)
        res.status(404).json({ message: 'error in createBlog - controllers/blog.js', error, success: false })
    }
}

// Update Blog
export const updateBlog = async (req, res) => {
    try {
        const findedBlog = await Blog.findById(req.params.id)
        if (!findedBlog) return res.status(400).json({ message: 'blog not exist', success: false })

        const body = req.body
        delete body._id

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: body }, { new: true })
        return res.status(200).json({ result: updatedBlog, message: 'blog updated successfully!', success: true })
    } catch (error) {
        console.log(`error in updateBlog = \n`, error)
        return res.status(404).json({ message: 'error in updateBlog - controllers/blog.js', error, success: false })
    }
}

// Delete Blog
export const deleteBlog = async (req, res) => {
    try {
        const findedBlog = await Blog.findById(req.params.id)
        if (!findedBlog) return res.status(400).json({ message: 'blog not exist', success: false })
        
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id)
        return res.status(200).json({ result: deletedBlog, message: 'blog deleted successfully!', success: true })
    } catch (error) {
        console.log(`error in deleteBlog = \n`, error)
        res.status(404).json({ message: 'error in deleteBlog - controllers/blog.js', error, success: false })
    }
}