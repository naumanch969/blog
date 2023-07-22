import { error, end, start, getCategoriesReducer, createCategoryReducer } from "../reducers/category"
import * as api from '../api'

export const getCategories = () => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.getCategories();
        dispatch(getCategoriesReducer(data.result));
    } catch (err) {
        dispatch(error());
        console.log('error in getCategories', err);
    }
    dispatch(end());
};

export const createCategory = (name) => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.createCategory(name);
        dispatch(createCategoryReducer(data.result));
    } catch (err) {
        dispatch(error());
        console.log('error in createCategory', err);
    }
    dispatch(end());
};
