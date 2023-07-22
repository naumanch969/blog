import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        error: false,
        users: [],
        currentUser: null,
        loggedUser: null,
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
        registerReducer: (state) => {
            return state
        },
        loginReducer: (state, action) => {
            state.loggedUser = action.payload
        },
        logoutReducer: (state) => {
            state.loggedUser = null
        },
        getUserReducer: (state, action) => {
            state.currentUser = action.payload
        },
        getUsersReducer: (state, action) => {
            state.users = action.payload
        },
        updateUserReducer: (state, action) => {
            state.users = state.users.map(user => user = user._id == action.payload._id ? action.payload : user)
        },
        deleteUserReducer: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload._id)
        },

    }
})

export const { start, end, error, registerReducer, loginReducer,logoutReducer, getUserReducer, getUsersReducer, updateUserReducer, deleteUserReducer } = userSlice.actions;
export default userSlice.reducer;