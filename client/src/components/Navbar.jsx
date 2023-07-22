import { Facebook, Instagram, Twitter, Clear, Pinterest, Search, PersonOutlined, Dehaze } from '@mui/icons-material'
import { people1 } from '../assets'
import { Link,useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/user'
import { useState } from 'react'


const Navbar = () => {

    const { loggedUser: user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const [showMobileNavbar, setShowMobileNavbar] = useState(false)

    const handleLogout = () => {
        dispatch(logout(navigate))
    }

    return (
        <div className='sticky top-0 h-[60px] w-full bg-white z-[100] ' >

            <div style={{ fontFamily: 'Josefin Sans' }} className='wrapper w-full h-full flex items-center lg:px-[4rem] md:px-[1.5rem] px-[12px] ' >

                <Link to='/' className='left flex justify-start items-center gap-[4px] lg:flex-[3] md:flex-[2] h-full ' >
                    <IconButton onClick={() => setShowMobileNavbar(pre => !pre)} className='' ><Dehaze /></IconButton>
                    <h3 style={{ fontFamily: 'cursive' }} className='font-bold text-[32px] ' >Blogy</h3>
                    {
                        showMobileNavbar
                        &&
                        <div style={{width:'15rem'}} className='lg:hidden flex flex-col gap-[2rem] p-[1rem] h-screen w-[15rem]  bg-white absolute top-0 left-0 transition-all '  >
                            <div className='flex justify-between items-center ' >
                                <h3 style={{ fontFamily: 'cursive' }} className='font-bold text-[32px] ' >Blogy</h3>
                                <IconButton onClick={() => setShowMobileNavbar(false)} className=''  ><Clear /></IconButton>
                            </div>
                            <div className='flex flex-col gap-[1rem] ' >
                                <ul className='topList flex flex-col justify-start gap-[12px] lg:gap-[20px] md:gap-[12px] list-none p-0 m-0 ' >
                                    <Link to='/' className='flex ' onClick={()=>setShowMobileNavbar(false)} > <li className='text-[16px] font-light cursor-pointer uppercase hover:underline ' >HOME</li></Link>
                                    <Link to='/' className='flex ' onClick={()=>setShowMobileNavbar(false)} > <li className='text-[16px] font-light cursor-pointer uppercase hover:underline ' >ABOUT</li></Link>
                                    <Link to='/contact' className='flex ' onClick={()=>setShowMobileNavbar(false)} > <li className='text-[16px] font-light cursor-pointer uppercase hover:underline ' >CONTACT</li></Link>
                                    <Link to='/write' className='flex ' onClick={()=>setShowMobileNavbar(false)} > <li className='text-[16px] font-light cursor-pointer uppercase hover:underline ' >WRITE</li></Link>
                                    {user && <button onClick={handleLogout} style={{textAlign:'start'}} className='text-start ' > <li className='text-[16px] font-light cursor-pointer uppercase hover:underline ' >Logout</li></button>}
                                </ul>
                            </div>
                        </div>
                    }
                </Link>



                <div className='md:flex hidden justify-center items-center flex-[6] h-full ' >
                    <ul className='topList flex justify-center lg:gap-[20px] md:gap-[12px] list-none p-0 m-0 ' >
                        <Link to='/' className='flex justify-center items-center ' > <li className='text-[16px] font-light cursor-pointer uppercase ' >HOME</li></Link>
                        <Link to='/' className='flex justify-center items-center ' > <li className='text-[16px] font-light cursor-pointer uppercase ' >ABOUT</li></Link>
                        <Link to='/contact' className='flex justify-center items-center ' > <li className='text-[16px] font-light cursor-pointer uppercase ' >CONTACT</li></Link>
                        <Link to='/write' className='flex justify-center items-center ' > <li className='text-[16px] font-light cursor-pointer uppercase ' >WRITE</li></Link>
                        {user && <button onClick={handleLogout} > <li className='text-[16px] font-light cursor-pointer uppercase ' >Logout</li></button>}
                    </ul>
                </div>

                <div className='flex justify-end items-center lg:gap-[16px] md:gap-[8px] flex-[3] h-full ' >
                    <Search style={{ fontSize: '24px', color: '#666', cursor: 'pointer' }} />
                    {
                        user
                            ?
                            <>
                                <span className='font-bold lg:text-[20px] md:text-[16px] capitalize ' >{user?.username}</span>
                                <Link to='/account' ><img src={people1} alt='' className='w-[40px] h-[40px] rounded-full object-cover ' /></Link>
                            </>
                            :
                            <>
                                <Link to='/login' className=''>
                                    <PersonOutlined style={{ fontSize: '32px' }} />
                                </Link>
                            </>
                    }
                </div>

            </div>

        </div>
    )
}

export default Navbar;