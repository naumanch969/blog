import { Rightbar } from '../components'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Edit, Delete, Clear, Publish } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { getBlog, updateBlog, deleteBlog } from '../redux/actions/blog'
import FileBase from 'react-file-base64'
import { image1, people1 } from '../assets'
import { Blogs } from '../components'
import { Facebook, Instagram, Twitter, Pinterest } from '@mui/icons-material'
import { getCategories } from '../redux/actions/category'
import TextareaAutoSize from 'react-textarea-autosize'

const Blog = () => {

    ////////////////////////////////////////// VARIABLES ////////////////////////////////
    const fileBase64Ref = useRef(null)
    const { currentBlog: blog, isFetching, blogs } = useSelector(state => state.blog)
    const { loggedUser: user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const { id } = useParams()
    const navigate = useNavigate()

    ////////////////////////////////////////// STATES //////////////////////////////////
    const [blogData, setBlogData] = useState(blog)
    const [categoryValue, setCategoryValue] = useState('')
    const [updateMode, setUpdateMode] = useState(false)

    ////////////////////////////////////////// EFFECTS /////////////////////////////////
    useEffect(() => {
        dispatch(getBlog(id))
    }, [id])
    useEffect(() => {
        setBlogData(blog)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [blog])

    ////////////////////////////////////////// FUNCTIONS ////////////////////////////////
    const handleDelete = () => {
        dispatch(deleteBlog(blog._id, navigate))
    }
    const handleUpdate = () => {
        const { title, description, image, categories } = blogData
        if (!title || !description || !image || !categories) return alert('make sure to provide all the fields!')
        dispatch(updateBlog(blog._id, { title, description, image, categories }, setUpdateMode))
    }
    const handleChange = (e) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value })
    }


    const handleImageButtonClick = () => {
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (file) => {
        setBlogData({ ...blogData, image: file.base64 })
    }
    const handleDeleteImage = () => {
        setBlogData({ ...blogData, image: '' })
    }
    // 8)   -   tags/categories
    const handleFilterCategory = (categoryToDelete) => {
        blogData.categories = blogData?.categories.filter((c) => c !== categoryToDelete)
        setBlogData({ ...blogData })
    }
    // 9)
    const handleAddCategory = (e) => {
        if (!(e.key == 'Enter')) return
        const value = e.target.value
        if (!value.trim()) return
        console.log(blogData)
        setBlogData({ ...blogData, categories: [...blogData?.categories, value] })
        e.target.value = ""
        setCategoryValue('')
    }


    const Category = ({ title }) => (
        <div className="flex gap-[8px] items-center justify-between rounded-[16px] py-[2px] px-[6px] bg-gray-200 w-auto " >
            <p className="text-black font-medium w-max text-[14px] " >{title}</p>
            <button className='bg-black text-white w-[14px] h-[14px] flex justify-center items-center rounded-full ' ><Clear style={{ fontSize: '10px' }} onClick={() => handleFilterCategory(title)} className={`cursor-pointer text-white text-[1rem] bg-lightGray  rounded-full `} /></button>
        </div>
    )

    return (
        <div className='w-full flex flex-col gap-[1rem] ' >



            <div className='flex lg:flex-row flex-col gap-[1rem] md:p-[2rem] p-[12px] ' >
                <div className='lg:flex-[9] ' >
                    <div className='wrapper' >
                        {
                            blogData?.image
                                ?
                                <div style={{ height: '18rem' }} className="bg-gray-100 h-[18rem] rounded-[12px] flex justify-center items-center " >
                                    <img src={blogData?.image} alt='' className='w-full h-[300px] rounded-[5px] object-cover ' />
                                    {updateMode && <button onClick={() => handleDeleteImage()} style={{ top: '10px', right: '10px' }} className="absolute top-[10px] right-[10px] text-white " ><Clear /></button>}
                                </div>
                                :
                                <div ref={fileBase64Ref} id="filebase_image" style={{ height: '10rem' }} className="bg-gray-400 h-[10rem] p-[8px] rounded-[12px] bg-lightGray  flex justify-center items-center " >
                                    <div onClick={() => { updateMode && handleImageButtonClick() }} className=" w-full h-full relative p-[8px] text-[20px] rounded-[12px] flex justify-center items-center gap-[8px] " >
                                        {
                                            updateMode
                                                ?
                                                <>
                                                    <Publish className='w-[24px] h-[24px] cursor-pointer flex justify-center items-center border-[1px] border-black rounded-full  ' style={{ fontSize: '20px', color: 'rgb(121,118,118)', }} />
                                                    <span className='' >Add Image</span>
                                                </>
                                                :
                                                <span className='' >Image</span>
                                        }
                                    </div>
                                    <FileBase type="file" onDone={(file) => addImageFunc(file)} />
                                </div>
                        }

                        <div className='flex m-[10px] justify-center ' >
                            {
                                updateMode
                                    ?
                                    <input type='text' value={blogData?.title} onChange={handleChange} name='title' placeholder='Your Title Here' className='w-full text-[30px] border-none outline-none  ' autoFocus={true} />
                                    :
                                    <h2 style={{ fontFamily: 'Lora' }} className='text-[28px] text-center px-[2rem] ' >{blogData?.title}</h2>
                            }
                            {
                                blog?.username == user?.username &&
                                <span className='float-right text-[16px] flex gap-[10px]  ' >
                                    <button onClick={() => setUpdateMode(true)} className='' ><Edit style={{ color: 'teal' }} /></button>
                                    <button onClick={handleDelete} className='' ><Delete style={{ color: 'tomato' }} /></button>
                                </span>
                            }
                        </div>
                        <div style={{ fontFamily: 'Varela' }} className='mb-[20px] flex justify-between text-[16px] text-[#ba9656] ' >
                            <Link to={`/blogs?username=${blog?.username}`} >
                                <span className='' >Author: <b>{blogData?.username}</b></span>
                            </Link>
                            <span className='' >{new Date(blogData?.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className='my-[1rem] ' >
                            {
                                updateMode
                                    ?
                                    <div className="flex flex-col gap-[8px] w-full " >
                                        <input
                                            className="border-none outline-none text-[14px] w-full "
                                            placeholder="Categories - separated by enter"
                                            value={categoryValue}
                                            onChange={(e) => setCategoryValue(e.target.value)}
                                            onKeyDown={handleAddCategory}
                                        />
                                        <div className='w-full flex flex-wrap gap-[8px] ' >
                                            {
                                                blogData?.categories.map((category, index) => (
                                                    <Category title={category} key={index} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className='w-full flex gap-[8px] ' >
                                        {
                                            blogData?.categories.map((category, index) => (
                                                <Link to='' key={index} className='text-gray-500 italic hover:underline ' >#{category}</Link>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                        {
                            updateMode
                                ?
                                <div className='flex flex-col items-end' >
                                    <TextareaAutoSize
                                        minRows={6}
                                        type='text'
                                        value={blogData?.description}
                                        onChange={handleChange}
                                        name='description'
                                        placeholder='Tell your story...'
                                        className='outline-none w-full text-[16px] resize-none '
                                    />
                                    <button onClick={handleUpdate} className=' text-white bg-teal-700 p-[10px] border-none rounded-[10px] cursor-pointer text-[16px]  ' >
                                        {isFetching ? 'Loading...' : 'Update'}
                                    </button>
                                </div>
                                :
                                <p className='text-[#666] sm:text-[18px] text-[16px] leading-[25px] first-letter:ml-[20px] first-letter:text-[30px] first-letter:font-semibold ' >
                                    {blogData?.description}
                                </p>
                        }

                    </div>
                </div>



                {/* rightbar */}
                <div className='lg:flex-[3] ' >

                    <div className='wrapper bg-gray-200 flex flex-col items-center p-[12px] ' >

                        <div className='flex flex-col items-center gap-[2rem] ' >
                            {/* about the author */}
                            <h3 style={{ fontFamily: 'Varela' }} className='border-b-[0.5px] border-gray-400 w-full font-bold uppercase lg:w-[80%] py-[8px] text-center ' >about the author</h3>
                            <div className='flex lg:flex-col sm:flex-row flex-col lg:gap-[1rem] md:gap-[1.2rem] ' >
                                {/* author name and image */}
                                <div className='flex-[2] flex flex-col items-center gap-[8px] pb-[1rem] ' >
                                    <img src={people1} alt='' className=' ' />
                                    <h4 className='' >{user.username}</h4>
                                    <div className='w-full flex justify-center gap-[10px] '  >
                                        <Facebook style={{ fontSize: '15px', cursor: 'pointer' }} />
                                        <Instagram style={{ fontSize: '15px', cursor: 'pointer' }} />
                                        <Twitter style={{ fontSize: '15px', cursor: 'pointer' }} />
                                        <Pinterest style={{ fontSize: '15px', cursor: 'pointer' }} />
                                    </div>
                                </div>
                                {/* author detail */}
                                <div className='flex-[6] ' >
                                    <p className='py-[10px] w-full text-justify ' >
                                        {
                                            user?.detail
                                            ||
                                            'Lorem ipsum dolar sit amet consect etur adipi sicing elti. Volut ate qui necessitatiebus nostrum illue reprehenderit.'
                                        }
                                    </p>
                                    <div className='flex flex-col items-center py-[1rem] ' >
                                        {/* <span style={{ fontFamily: 'Varela' }} className='uppercase m-[10px] p-[4px] w-full border-t-[1px] border-gray-400 text-[14px] text-[#222] font-semibold leading-[20px] text-center ' >Social Media</span>
                                        <div className='w-[250px] flex justify-center gap-[10px] '  >
                                            <Facebook style={{ fontSize: '15px', cursor: 'pointer' }} />
                                            <Instagram style={{ fontSize: '15px', cursor: 'pointer' }} />
                                            <Twitter style={{ fontSize: '15px', cursor: 'pointer' }} />
                                            <Pinterest style={{ fontSize: '15px', cursor: 'pointer' }} />
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


            <Blogs blogs={blogs} />


        </div>
    )
}

export default Blog;
                    // {/* <div className='flex flex-col items-center ' >
                    //     <span style={{ fontFamily: 'Varela' }} className='uppercase m-[10px] p-[5px] w-[80%] border-t-[1px] border-[#a7a4a4] text-[14px] text-[#222] font-semibold leading-[20px] text-center ' >categories</span>
                    //     <ul className='list-none mb-[30px] ' >
                    //         {
                    //             categories.map((category, index) => (
                    //                 <Link key={index} to={`/blogs?category=${category.name}`} >
                    //                     <li className='inline-block w-[50%] mt-[15px] cursor-pointer ' >{category.name}</li>
                    //                 </Link>
                    //             ))
                    //         }
                    //     </ul>
                    // </div> */}