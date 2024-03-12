import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import detailsReducer from './detailsSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    details: detailsReducer,
  },
});
