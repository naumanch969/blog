import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        isFetching: false,
        error: false,
        blogs: [],
        currentBlog: null,
    },
    reducers: {
        start: (state) => {
            state.isFetching = true
            state.error = false
        },
        end: (state) => {
            state.isFetching = false
            state.error = false
        },
        error: (state) => {
            state.isFetching = false
            state.error = true
        },
        getBlogReducer: (state, action) => {
            state.currentBlog = action.payload
        },
        getBlogsReducer: (state, action) => {
            state.blogs = action.payload.reverse()
        },
        createBlogReducer: (state, action) => {
            state.blogs = [...state.blogs, action.payload]
        },
        updateBlogReducer: (state, action) => {
            state.blogs = state.blogs.map(blog => blog = blog._id == action.payload._id ? action.payload : blog)
        },
        deleteBlogReducer: (state, action) => {
            state.blogs = state.blogs.filter(blog => blog._id !== action.payload._id)
        },

    }
})

export const { start, end, error, getBlogReducer, getBlogsReducer, createBlogReducer, updateBlogReducer, deleteBlogReducer } = blogSlice.actions;
export default blogSlice.reducer;