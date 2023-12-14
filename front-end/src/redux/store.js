import {configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import localStorage from 'reduxjs-toolkit-persist/lib/storage'
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import categoryReducer from './slices/categorySlice';
import cartReducer from './slices/cartSlice';
import userSlice from './slices/userSlice'


  const categoryPersistConfig = {
    key: 'categories',
    storage:localStorage,
  }
  const cartPersistConfig = {
    key: 'cart',
    storage:localStorage,
  }
  const userPersistConfig={
    key:'userInfo',
    storage:storageSession
  }
export const store=configureStore({
    reducer:{
      user:persistReducer(userPersistConfig,userSlice.reducer),
      cart:persistReducer(cartPersistConfig,cartReducer),
      category:persistReducer(categoryPersistConfig,categoryReducer)
    },
}) 
export const persistor=persistStore(store)
