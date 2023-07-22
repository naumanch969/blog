import { Header, Blogs, Rightbar } from '../components'
import { getBlogs } from '../redux/actions/blog'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogsPage = () => {

    ////////////////////////////////////////// VARIABLES /////////////////////////////////////////
    const { username, category } = useParams()

    ////////////////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////////////////// EFFECTS /////////////////////////////////////////

    ////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////

    const { blogs } = useSelector(state => state.blog)

    const dispatch = useDispatch()

    useEffect(() => {
        if (username) {
            dispatch(getBlogs({ username }))
        }
        else if (category) {
            dispatch(getBlogs({ category }))
        }
        else if (username && category) {
            dispatch(getBlogs({ category }))
        }
        else {
            dispatch(getBlogs())
        }
    }, [username, category])


    return (
        <div className='flex ' >
            <Blogs blogs={blogs} />
        </div>
    )
}

export default BlogsPage;