import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    var TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:admin'))?.user)?.loggedUser?.token
    if(TOKEN){
        req.headers.auth_token = TOKEN
    }
    return req;
})

// USER 
export const register = (user) => API.post(`/user/register`, user)
export const login = (data) => API.put(`/user/login`, data)
export const getUser = () => API.get(`/user/${id}`)
export const getUsers = () => API.get(`/user/all`)
export const updateUser = (id, user) => API.put(`/user/update/${id}`, user)
export const deleteUser = (id) => API.delete(`/user/delete/${id}`)

// BLOG 
export const getBlogs = () => API.get(`/blog/all`)
export const getUserBlogs = (username) => API.get(`/blog/all?username=${username}`)
export const getCategoryBlogs = (category) => API.get(`/blog/all?category=${category}`)
export const getUserCategoryBlogs = (username,category) => API.get(`/blog/all?username=${username}&category=${category}`)
export const getBlog = (id) => API.get(`/blog/${id}`)
export const createBlog = (blog) => API.post(`/blog/create`,blog)
export const updateBlog = (id, blog) => API.put(`/blog/update/${id}`, blog)
export const deleteBlog = (id) => API.delete(`/blog/delete/${id}`)

// CATEGORY
export const getCategories = () => API.get(`/category/all`)
export const createCategory = (name) => API.post(`/category/create`,{name})

// CONTACT
export const contact = (contactData) => API.post(`/contact`,contactData)