import { createSlice } from '@reduxjs/toolkit'

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        isFetching: false,
        error: false,
        categories: [],
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
        getCategoriesReducer: (state, action) => {
            state.categories = action.payload
        }, 
        createCategoryReducer: (state, action) => {
            state.categories = state.categories.concat(action.payload)
        }, 

    }
})

export const { start, end, error, getCategoriesReducer,  createCategoryReducer } = categorySlice.actions;
export default categorySlice.reducer;