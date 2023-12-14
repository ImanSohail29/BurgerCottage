import {configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import localStorage from 'reduxjs-toolkit-persist/lib/storage'

import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';


  const categoryPersistConfig = {
    key: 'categories',
    storage:localStorage,
  }
  const cartPersistConfig = {
    key: 'cart',
    storage:localStorage,
  }
export const store=configureStore({
    reducer:{
      cart:persistReducer(cartPersistConfig,cartReducer),

        category:persistReducer(categoryPersistConfig,categoryReducer)
    },
}) 
export const persistor=persistStore(store)
