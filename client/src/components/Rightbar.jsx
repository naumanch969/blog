import { image1 } from '../assets'
import { Facebook, Instagram, Twitter, Pinterest } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategories } from '../redux/actions/category'
import { Link } from 'react-router-dom'

const Rightbar = () => {

    ////////////////////////////////////////// VARIABLES /////////////////////////////////////////
    const { categories } = useSelector(state => state.category)
    const dispatch = useDispatch()

    ////////////////////////////////////////// STATES /////////////////////////////////////////

    ////////////////////////////////////////// EFFECTS /////////////////////////////////////////
    

    ////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////



    return (
        <div className='rightbar md:flex-[3] m-[20px] bg-[#fdfbfb] pb-[30px] rounded-[10px] ' >

            <div className='wrapper flex flex-col items-center ' >

                <div className='flex flex-col items-center ' >
                    <span style={{ fontFamily: 'Varela' }} className='uppercase m-[10px] p-[5px] w-[80%] border-y-[1px] border-[#a7a4a4] text-[14px] text-[#222] font-semibold leading-[20px] text-center ' >about me</span>
                    <img src={image1} alt='' className='mt-[15px] ' />
                    <p className='py-[10px] ' >
                        Lorem ipsum dolar sit amet consect etur adipisicing elti. Volutate qui necessitatiebus nostrum illue reprehenderit.
                    </p>
                </div>

                <div className='flex flex-col items-center ' >
                    <span style={{ fontFamily: 'Varela' }} className='uppercase m-[10px] p-[5px] w-[80%] border-t-[1px] border-[#a7a4a4] text-[14px] text-[#222] font-semibold leading-[20px] text-center ' >categories</span>
                    <ul className='list-none mb-[30px] ' >
                        {
                            categories.map((category, index) => (
                                <Link key={index} to={`/blogs?category=${category.name}`} >
                                    <li className='inline-block w-[50%] mt-[15px] cursor-pointer ' >{category.name}</li>
                                </Link>
                            ))
                        }

                    </ul>
                </div>

                <div className='flex flex-col items-center ' >
                    <span style={{ fontFamily: 'Varela' }} className='uppercase m-[10px] p-[5px] w-[80%] border-t-[1px] border-[#a7a4a4] text-[14px] text-[#222] font-semibold leading-[20px] text-center ' >follow us</span>
                    <div className='mt-[15px] w-[250px] flex justify-center gap-[10px] '  >
                        <Facebook style={{ fontSize: '15px', cursor: 'pointer' }} />
                        <Instagram style={{ fontSize: '15px', cursor: 'pointer' }} />
                        <Twitter style={{ fontSize: '15px', cursor: 'pointer' }} />
                        <Pinterest style={{ fontSize: '15px', cursor: 'pointer' }} />
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Rightbar