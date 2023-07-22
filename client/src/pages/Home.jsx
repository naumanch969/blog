import { Header, Blogs, Rightbar } from '../components'
import { getBlogs } from '../redux/actions/blog'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

    ////////////////////////////////////////// VARIABLES ///////////////////////////////
    const { blogs } = useSelector(state => state.blog)
    const dispatch = useDispatch()

    ////////////////////////////////////////// STATES //////////////////////////////////

    ////////////////////////////////////////// EFFECTS /////////////////////////////////
    useEffect(() => {
        dispatch(getBlogs())
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    ////////////////////////////////////////// FUNCTIONS //////////////////////////////



    return (
        <>
            <Header />
            <div className='home flex ' >
                <Blogs blogs={blogs} />
            </div>
        </>
    )
}

export default Home;