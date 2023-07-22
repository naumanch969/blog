import { Link, useNavigate } from 'react-router-dom'
import { register } from '../redux/actions/user'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Register = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { error, isFetching } = useSelector(state => state.user)

    const initialUser = { username: '', email: '', password: '' }
    const [userData, setUserData] = useState(initialUser)

    const handleRegister = (e) => {
        e.preventDefault()
        dispatch(register(userData, navigate))
        setUserData(initialUser)
    }
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ height: 'calc(100vh - 60px)' }} className='Register h-[calc(100vh - 60px)] min-h-[35rem] flex flex-col justify-center items-center ' >

            <h2 className='text-[50px] '  >Register</h2>

            <form className='form flex flex-col mt-[20px] ' >
                <label className='my-[10px] '>Name</label>
                <input onChange={handleChange} value={userData.username} name='username' type='name' placeholder="Name" className='p-[10px] bg-gray-200 border-none rounded-[20px] ' />
                <label className='my-[10px] '>Email</label>
                <input onChange={handleChange} value={userData.email} name='email' type='email' placeholder="Email" className='p-[10px] bg-gray-200 border-none rounded-[20px] ' />
                <label className='my-[10px] '>Password</label>
                <input onChange={handleChange} value={userData.password} name='password' type='password' placeholder="Password" className='p-[10px] bg-gray-200 border-none rounded-[20px] ' />
                <button onClick={handleRegister} className='mt-[20px] cursor-pointer p-[10px] bg-red-400 border-none text-white rounded-[10px] ' >
                    {isFetching ? 'Loading...' : 'Register' }
                </button>
                {error && <span className='text-red-500 mt-[20px] text-center w-full ' >Something went wrong!</span>}
            </form>

            <Link to='/login' className='absolute top-[80px] right-[20px] bg-teal-700 cursor-pointer border-none p-[10px] text-white rounded-[10px] '  >Login</Link>
        </div>
    )
}

export default Register