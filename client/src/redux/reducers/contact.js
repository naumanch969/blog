import { createSlice } from '@reduxjs/toolkit'

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        isFetching: false,
        error: false,
        contactUsers: [],
    },
    reducers: {
        start: (state) => {
            state.isFetching = true
            state.error = false
        },
        end: (state) => {
            state.isFetching = false
            state.error = false
        },
        error: (state) => {
            state.isFetching = false
            state.error = true
        },
        contactReducer: (state, action) => {
            state.contactUsers = state.contactUsers.concat(action.payload)
        }
    }
})

export default contactSlice.reducer
export const { start, end, error, contactReducer } = contactSlice.actions