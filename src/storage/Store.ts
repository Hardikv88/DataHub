import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import addCardItem from './AddProducts';
import WishListItem from './WishList';
import userReducer from '../pages/users/userSlice';
import postReducer from '../pages/posts/postSlice';

// Custom storage adapter to bypass Vite's ESM/CJS interop issues with redux-persist
const customStorage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, item: string) => {
    localStorage.setItem(key, item);
    return Promise.resolve();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: customStorage,
  // whitelist:['addItem ']
}
 

const rootReducer = combineReducers({
    addItem:addCardItem,
    WishListItem:WishListItem,
    users: userReducer,
    posts: postReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);