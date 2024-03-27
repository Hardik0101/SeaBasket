import {createSlice} from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: [],
  },
  reducers: {
    setuserData: (state, action) => {
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    },

    clearUserDataState: state => {
      state.userData = [];
    },
  },
});

export const {setuserData, clearUserDataState} = userDataSlice.actions;

export default userDataSlice.reducer;
