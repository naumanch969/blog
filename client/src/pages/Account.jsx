import { Rightbar } from '../components'
import { Publish } from '@mui/icons-material'
import { image3 } from '../assets'

import { updateUser } from '../redux/actions/user'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'

const Account = () => {

    ////////////////////////////////////////// VARIABLES /////////////////////////////////////////
    const dispatch = useDispatch()
    const { loggedUser } = useSelector(state => state.user)
    const fileBase64Ref = useRef(null)

    ////////////////////////////////////////// STATES /////////////////////////////////////////
    const [userData, setUserData] = useState({ username: loggedUser.username, email: loggedUser.email, password: '' })

    ////////////////////////////////////////// EFFECTS /////////////////////////////////////////

    ////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUser(loggedUser._id, { username: userData.username, email: userData.email, }))
    }
    const handleDelete = () => {
        dispatch(updateUser(loggedUser._id))
    }
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    const handleImageButtonClick = (e) => {
        e.preventDefault()
        fileBase64Ref.current.querySelector('input[type="file"]').click();
    }
    const addImageFunc = (files) => {
        setUserData({ ...userData, image: files[0].base64 })
    }
    const deleteTestimonialImageFunc = () => {
        setUserData({ ...userData, image: '' })
    }

    return (
        <div className='flex  ' >

            <div className='flex-[9] p-[20px] ' >
                <div className='flex items-center justify-between '   >
                    <span className='capitalize text-[30px] mb-[20px] text-red-400 ' >Update your account</span>
                    <span onClick={handleDelete} className='capitalize text-[14px] mb-[20px] text-red-500 cursor-pointer ' >Delete account</span>
                </div>
                <form className='flex flex-col ' >
                    <label className='' >Profile Picture</label>
                    <div className='flex items-center gap-[10px] my-[10px] ' >
                        {
                            userData.image
                                ?
                                <div
                                    className="relative w-[7rem] h-[7rem] p-[8px] rounded-full flex justify-center items-center  " >
                                    <img src={userData.image} alt="" className="rounded-full " />
                                    <button onClick={() => deleteTestimonialImageFunc()} className="absolute top-[0px] right-[0px] text-white   " ><Clear /></button>
                                </div>
                                :
                                <div ref={fileBase64Ref} id="filebase_image" className=" w-[7rem] h-[7rem] p-[8px] rounded-full bg-lightGray  flex justify-center items-center " >
                                    <button onClick={handleImageButtonClick} className="flex flex-col justify-center items-center text-textGray  " >
                                        <Publish /> Add Photo
                                    </button>
                                    <FileBase type="file" onDone={(filesArr) => { addImageFunc(filesArr) }} />                                </div>
                        }
                    </div>
                    <label className='text-[20px] mt-[20px] ' >Username</label>
                    <input onChange={handleChange} name='username' value={userData.username} type='text' placeholder='username' className='text-gray-500 my-[10px] h-[30px] border-none border-b-[1px] border-gray-500 ' />
                    <label className='text-[20px] mt-[20px] ' >Email</label>
                    <input onChange={handleChange} name='email' value={userData.email} type='email' placeholder='email' className='text-gray-500 my-[10px] h-[30px] border-none border-b-[1px] border-gray-500 ' />
                    <label className='text-[20px] mt-[20px] ' >Password</label>
                    <input onChange={handleChange} name='password' type='password' className='text-gray-500 my-[10px] h-[30px] border-none border-b-[1px] border-gray-500 ' />
                    <button onClick={handleUpdate} className='w-[150px] self-center border-none rounded-[10px] text-white bg-teal-700 p-[10px] mt-[20px] cursor-pointer ' >Update</button>
                </form>
            </div>
            <Rightbar />

        </div>
    )
}

export default Account;