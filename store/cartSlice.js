import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'carts',
  initialState: {
    cart: [],
  },
  reducers: {
    addCart: (state, action) => {
      state.cart.unshift(action.payload);
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item, index) => index !== action.payload);
    },
    clearState: state => {
      state.cart = [];
    },
  },
});

export const {addCart, removeCart, clearState} = cartSlice.actions;

export default cartSlice.reducer;
