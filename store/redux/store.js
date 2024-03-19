import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import detailsReducer from './detailsSlice';
import cartReducer from './cartSlice';
import checkReducer from './checkoutSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    details: detailsReducer,
    carts: cartReducer,
    check: checkReducer,
  },
});
