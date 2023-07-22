import { error, end, start, getBlogReducer, getBlogsReducer, createBlogReducer, updateBlogReducer, deleteBlogReducer } from "../reducers/blog"
import * as api from '../api'

export const getBlogs = ({ category, username } = {}) => async (dispatch) => {
    dispatch(start());
    try {
        let blogs;
        if (username) {
            const { data } = await api.getUserBlogs(username);
            blogs = data
        }
        if (category) {
            const { data } = await api.getCategoryBlogs(category);
            blogs = data
        }
        if (category && username) {
            const { data } = await api.getUserCategoryBlogs(username, category);
            blogs = data
        }
        else {
            const { data } = await api.getBlogs();
            blogs = data
        }
        dispatch(getBlogsReducer(blogs.result));
    } catch (err) {
        dispatch(error());
        console.log('error in getBlogs', err);
    }
    dispatch(end());
};

export const getBlog = (id) => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.getBlog(id);
        dispatch(getBlogReducer(data.result));
    } catch (err) {
        dispatch(error());
        console.log('error in getBlog', err);
    }
    dispatch(end());
};

const initialBlogData = { title: '', description: '', image: '' }
export const createBlog = (blog, navigate, setBlogData) => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.createBlog(blog);
        dispatch(createBlogReducer(data.result));
        setBlogData(initialBlogData)
        alert('blog created successfully')
        navigate('/')
    } catch (err) {
        dispatch(error());
        console.log('error in createBlog', err);
    }
    dispatch(end());
};

export const updateBlog = (id, blog, setUpdateMode) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateBlog(id, blog)
        dispatch(updateBlogReducer(data.result))
        setUpdateMode(false)
    } catch (err) {
        dispatch(error())
        console.log('error in updateBlog', err)
    }
    dispatch(end());
}

export const deleteBlog = (id, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteBlog(id)
        dispatch(deleteBlogReducer(data.result))
        navigate('/')
    } catch (err) {
        dispatch(error())
        console.log('error in deleteBlog', err)
    }
    dispatch(end());
}