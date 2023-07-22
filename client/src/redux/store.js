import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducers from './reducers/user';
import blogReducers from './reducers/blog';
import categoryReducers from './reducers/category';
import contactReducers from './reducers/contact';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'blog', version: 1, storage };
const rootReducer = combineReducers({ user: userReducers, blog: blogReducers, category: categoryReducers, contact: contactReducers });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
            
        })
});

export const persistor = persistStore(store);