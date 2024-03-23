import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import detailsReducer from './detailsSlice';
import cartReducer from './cartSlice';
import checkoutReducer from './checkoutSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    details: detailsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
});
