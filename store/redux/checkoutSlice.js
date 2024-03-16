import {createSlice} from '@reduxjs/toolkit';

const checkSlice = createSlice({
  name: 'checkSlice',
  initialState: {
    check: [],
  },
  reducers: {
    setCheck: (state, action) => {
      const {id, quantity} = action.payload;
      const existingIndex = state.check.findIndex(item => item.id === id);
      if (existingIndex !== -1) {
        state.check[existingIndex].quantity = isNaN(quantity) ? 1 : quantity;
      } else {
        const newQuantity = isNaN(quantity) ? 1 : quantity;
        const newProduct = {...action.payload, quantity: newQuantity};
        state.check.unshift(newProduct);
      }
    },
    removeCheck: (state, action) => {
      state.check = state.check.filter(
        (item, index) => index !== action.payload,
      );
    },
    incrementCheck: (state, action) => {
      const index = action.payload;
      state.check[index].quantity++;
    },
    decrementCheck: (state, action) => {
      const index = action.payload;
      const item = state.check[index];
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    setClearCheck: (state, action) => {
      state.check = [];
    },
  },
});

export const {
  setCheck,
  decrementCheck,
  incrementCheck,
  removeCheck,
  setClearCheck,
} = checkSlice.actions;

export default checkSlice.reducer;
