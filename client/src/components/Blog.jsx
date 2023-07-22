import { image3 } from '../assets'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {

    return (
        <div className='sm:w-[17rem] w-full ' >

            {
            blog.image 
            ?
                <img src={blog.image } alt='' className='w-full h-[14rem] rounded-[5px] object-cover ' />
                :
                <span  className='w-full h-[14rem] rounded-[5px] bg-gray-200 ' />
            }

            <div className='flex flex-col items-start' >
                <div style={{ fontFamily: 'Varela Round' }} className='text-[12px] bg-[#be9656] leading-[20px] mt-[15px] mr-[10px] ' >
                    {
                        blog.categories.map((category, index) =>
                            <span className='' key={index} >{category.name}</span>
                        )
                    }
                </div>
                <Link to={`/blog/${blog._id}`} >
                    <h4 style={{ fontFamily: 'Josefin Sans' }} className='capitalize text-[24px] font-bold cursor-pointer ' >{blog.title}</h4>
                </Link>
                <hr />
                <div className='w-full flex justify-between ' >
                    <span style={{ fontFamily: 'Lora' }} className='italic text-[14px] text-[#999] ' >{new Date(blog.createdAt).toLocaleString()}</span>
                    <p style={{ fontFamily: 'Varela Round' }} className='capitalize text-[14px] text-[#444] leading-[24px] overflow-ellipsis overflow-hidden line-clamp-4 ' >{/* text-overflow:ellipsis  is used to apply the ... characters at the end of text */}
                        {blog?.username}
                    </p>
                </div>

            </div>

        </div>
    )
}
export default Blog;