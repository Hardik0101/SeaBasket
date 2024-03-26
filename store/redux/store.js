import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dataReducer from './dataSlice';
import detailsReducer from './detailsSlice';
import cartReducer from './cartSlice';
import checkoutReducer from './checkoutSlice';
import userDataReducer from './userDataSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  data: dataReducer,
  details: detailsReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  userData: userDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
