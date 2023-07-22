import { error, end, start, loginReducer,logoutReducer, getUserReducer, getUsersReducer, registerReducer, updateUserReducer, deleteUserReducer } from "../reducers/user"
import * as api from '../api/index'

export const getUsers = () => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.getUsers();
        dispatch(getUsersReducer(data.result));
    } catch (err) {
        dispatch(error());
        console.log('error in getUsers', err);
    }
    dispatch(end());
};

export const getUser = (id) => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.getUser(id);
        dispatch(getUserReducer(data.result));
    } catch (err) {
        dispatch(error());
        console.log('error in getUser', err);
    }
    dispatch(end());
};

export const register = (user, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        const data = await api.register(user)
        dispatch(registerReducer())
        navigate('/login')
    } catch (err) {
        dispatch(error())
        console.log('error in register', err)
    }
    dispatch(end());
}

export const login = (user, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.login(user)
        dispatch(loginReducer(data.result))
        navigate('/')
    } catch (err) {
        dispatch(error())
        console.log('error in login', err)
    }
    dispatch(end());
}

export const logout = ( navigate) => async (dispatch) => {
    dispatch(start())
    try {
        dispatch(logoutReducer())
        navigate('/')
    } catch (err) {
        dispatch(error())
        console.log('error in login', err)
    }
    dispatch(end());
}

export const updateUser = (id, user) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateUser(id, user)
        dispatch(updateUserReducer(data.result))
    } catch (err) {
        dispatch(error())
        console.log('error in updateUser', err)
    }
    dispatch(end());
}

export const deleteUser = (id) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteUser(id)
        dispatch(deleteUserReducer(data.result))
    } catch (err) {
        dispatch(error())
        console.log('error in deleteUser', err)
    }
    dispatch(end());
}