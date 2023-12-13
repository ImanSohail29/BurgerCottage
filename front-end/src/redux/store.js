import {configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import localStorage from 'reduxjs-toolkit-persist/lib/storage'

import categoryReducer from './slices/categorySlice';


  const categoryPersistConfig = {
    key: 'categories',
    storage:localStorage,
  }
export const store=configureStore({
    reducer:{
        category:persistReducer(categoryPersistConfig,categoryReducer)
    },
}) 
export const persistor=persistStore(store)
