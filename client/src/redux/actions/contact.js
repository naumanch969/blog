import * as api from '../api/index'
import { start, end, error, contactReducer } from '../reducers/contact'

const initialContactData = { name: '', email: '', subject: '', message: '' }
export const contact = (contactData, setContactData) => async (dispatch) => {
    try {
        dispatch(start())

        const data = await api.contact(contactData)
        dispatch(contactReducer(data.result))
        setContactData(initialContactData)

        dispatch(end())
    }
    catch (err) {
        dispatch(error())
        console.log('error in contact',err)
    }
}