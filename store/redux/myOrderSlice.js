import {createSlice} from '@reduxjs/toolkit';

const myOrderSlice = createSlice({
  name: 'myOrderSlice',
  initialState: {
    order: [],
  },
  reducers: {
    setOrder: (state, action) => {
      state.order.unshift(action.payload);
    },
    setClearOrder: state => {
      state.order = [];
    },
  },
});

export const {setOrder, setClearOrder} = myOrderSlice.actions;

export default myOrderSlice.reducer;
