import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { contact } from '../redux/actions/contact'

const Contact = () => {

    const dispatch = useDispatch()
    const {  isFetching } = useSelector(state => state.contact)

    const initialContactData = { name: '', email: '', subject: '', message: '' }
    const [contactData, setContactData] = useState(initialContactData)


    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value })
    }

    const handleContact = (e) => {
        e.preventDefault()
        const { name, email, message, subject } = contactData
        if (!name || !email || !message || !subject) alert('provide all fields')
        dispatch(contact(contactData, setContactData))
    }


    return (
        <>
            <div className='w-full min-h-screen bg-lighter-brown flex flex-col items-center  ' >

                <div className={`wrapper lg:w-[40rem] md:w-[35rem] sm:w-[80%] w-full md:px-0 px-[1rem] flex flex-col gap-[1rem]  `} >

                    <h2 className='text-[32px] font-bold mt-[1rem] ' >Let's Connect</h2>

                    <div className='p-[2rem] bg-white flex flex-col gap-[1rem] ' >
                        <form onSubmit={handleContact} className='flex flex-col gap-[1rem] ' >
                            <div className='flex flex-col gap-[8px] ' >
                                <label className='' >First Name <span className='text-red-500 ' >*</span></label>
                                <input type='text' value={contactData.name} name='name' onChange={handleChange} placeholder={`Name`} className='w-full border-[1px] border-black rounded-[2px] p-[12px] ' />
                            </div>
                            <div className='flex flex-col gap-[8px] ' >
                                <label className='' >Email <span className='text-red-500 ' >*</span></label>
                                <input type='text' value={contactData.email} name='email' onChange={handleChange} placeholder={`Email`} className='w-full border-[1px] border-black rounded-[2px] p-[12px] ' />
                            </div>
                            <div className='flex flex-col gap-[8px] ' >
                                <label className='' >Subject <span className='text-red-500 ' >*</span></label>
                                <input type='text' value={contactData.subject} name='subject' onChange={handleChange} placeholder={`Subject`} className='w-full border-[1px] border-black rounded-[2px] p-[12px] ' />
                            </div>
                            <div className='flex flex-col gap-[8px] ' >
                                <label className='' >Message <span className='text-red-500 ' >*</span></label>
                                <textarea rows={5} type='text' value={contactData.message} name='message' onChange={handleChange} placeholder={`Message`} className='w-full border-[1px] border-black rounded-[2px] p-[12px] ' />
                            </div>

                            <button type={`submit`} className='w-full bg-black p-[1rem] text-white ' >
                                {isFetching ? 'Loading...' : 'Send'}
                            </button>
                        </form>
                    </div>

                </div>


            </div>

        </>
    )
}


export default Contact