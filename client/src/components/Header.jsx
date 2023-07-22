import { bg1 } from '../assets'


const Header = () => {


    return (
        <div className='mt-[60px]  ' > 

            <div className='' >

                <div style={{ fontFamily: 'Lora' }} className='flex flex-col items-center text-[#444] ' >
                    <span className='absolute top-[18%] text-[20px] ' >React & Node</span>
                    <span className='absolute top-[20%] text-[100px] ' >Blog</span>
                </div>
                <img src={bg1} alt='' className='w-full h-[450px] mt-[3.5rem] object-cover ' />

            </div>

        </div>
    )
}

export default Header;