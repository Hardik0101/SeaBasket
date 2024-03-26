import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'carts',
  initialState: {
    cart: [],
  },
  reducers: {
    addCart: (state, action) => {
      const {id} = action.payload;
      const existingIndex = state.cart.findIndex(item => item.id === id);
      if (existingIndex !== -1) {
        state.cart[existingIndex].quantity++;
      } else {
        const newProduct = {...action.payload, quantity: 1};
        state.cart.unshift(newProduct);
      }
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item, index) => index !== action.payload);
    },
    incrementCart: (state, action) => {
      const index = action.payload;
      state.cart[index].quantity++;
    },
    decrementCart: (state, action) => {
      const index = action.payload;
      const item = state.cart[index];
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    clearState: state => {
      state.cart = [];
    },
  },
});

export const {addCart, removeCart, clearState, incrementCart, decrementCart} =
  cartSlice.actions;

export default cartSlice.reducer;
