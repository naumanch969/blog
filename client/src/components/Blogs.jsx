import { Blog } from './'


const Blogs = ({ blogs }) => {

    

    return (
        <div className='md:flex-[9] flex flex-wrap justify-center gap-[1rem] m-[1rem] ' >

            {
                blogs.map((blog, index) => (
                    <Blog blog={blog} key={index} />
                ))
            }

        </div>
    )
}

export default Blogs;