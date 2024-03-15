import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getProductsDetails} from '../../apiCall/dataApi';

const detailsSlice = createSlice({
  name: 'details',
  initialState: {
    details: [],
  },
  reducers: {
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    clearState: state => {
      state.details = [];
    },
  },
});

export const fetchDetails = createAsyncThunk(
  'data/fetchDetails',
  async (id, {dispatch}) => {
    try {
      const products = await getProductsDetails(id);
      dispatch(setDetails(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const {setDetails, clearState} = detailsSlice.actions;
export default detailsSlice.reducer;
