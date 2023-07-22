import { Publish, Clear } from '@mui/icons-material'
import { image3 } from '../assets'

import { createBlog } from '../redux/actions/blog'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import TextareaAutosize from 'react-textarea-autosize';


const Write = () => {

    ////////////////////////////////////////// VARIABLES ///////////////////////////////// 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loggedUser } = useSelector(state => state.user)
    const { isFetching } = useSelector(state => state.blog)
    const fileBase64Ref = useRef(null)
    const initialBlogState = { title: '', description: '', image: '', categories: [] }

    ////////////////////////////////////////// STATES /////////////////////////////////// 
    const [blogData, setBlogData] = useState(initialBlogState)
    const [categoryValue, setCategoryValue] = useState('')

    ////////////////////////////////////////// EFFECTS /////////////////////////////////// 
    useEffect(() => {
        console.log('blogData', blogData)
    }, [blogData])

    ////////////////////////////////////////// FUNCTIONS //////////////////////////////// 
    const handleCreateBlog = (e) => {
        e.preventDefault()
        const { title, description, image, categories } = blogData;
        const { username } = loggedUser;
        console.log(title, description, image, categories,username)
        if (!title || !description || !image || !categories || !username) return alert('make sure to provide all the fields')
        dispatch(createBlog({ title, description, image, categories, username }, navigate, setBlogData))
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
        blogData.categories = blogData.categories.filter((c) => c !== categoryToDelete)
        setBlogData({ ...blogData })
    }
    // 9)
    const handleAddCategory = (e) => {
        if (!(e.key == 'Enter')) return
        const value = e.target.value
        if (!value.trim()) return
        blogData.categories = blogData.categories.concat(value)
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
        <div className='md:px-[2rem] sm:px-[1.5rem] px-[12px] py-[2rem]  '  >


            <div className='form relative flex flex-col gap-[1rem] ' >

                {
                    blogData.image
                        ?
                        <div style={{ height: '18rem' }} className="bg-gray-400 h-[18rem] rounded-[12px] flex justify-center items-center " >
                            <img src={blogData.image} alt='' className='w-full h-full rounded-[12px] object-cover ' />
                            <button onClick={() => handleDeleteImage()} style={{ top: '10px', right: '10px' }} className="absolute top-[10px] right-[10px] text-white " ><Clear /></button>
                        </div>
                        :
                        <div ref={fileBase64Ref} id="filebase_image" style={{ height: '10rem' }} className="bg-gray-400 h-[10rem] p-[8px] rounded-[12px] bg-lightGray  flex justify-center items-center " >
                            <div onClick={() => handleImageButtonClick()} className=" w-full h-full relative p-[8px] text-[20px] rounded-[12px] flex justify-center items-center gap-[8px] " >
                                <Publish className='w-[24px] h-[24px] cursor-pointer flex justify-center items-center border-[1px] border-black rounded-full  ' style={{ fontSize: '20px', color: 'rgb(121,118,118)', }} />
                                <span className='' >Add Image</span>
                            </div>
                            <FileBase type="file" onDone={(file) => addImageFunc(file)} />
                        </div>
                }

                <div className='flex flex-col items-start gap-[1rem] ' >
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
                            blogData.categories.map((category, index) => (
                                <Category title={category} key={index} />
                            ))
                        }
                        </div>
                    </div>
                    <input type='text' value={blogData.title} onChange={handleChange} name='title' placeholder='Your Title Here' className='w-full text-[30px] border-none outline-none  ' autoFocus={true} />
                    <TextareaAutosize
                        minRows={5}
                        value={blogData.description}
                        name='description'
                        placeholder='Tell your story...'
                        className='outline-none w-full text-[16px] resize-none '
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full flex justify-end ' >
                    <button onClick={handleCreateBlog} className='text-white bg-teal-700 p-[10px] border-none rounded-[10px] cursor-pointer text-[16px]  ' >
                        {isFetching ? 'Loading...' : 'Publish'}
                    </button>
                </div>
            </div>

        </div>
    )
}
export default Write;