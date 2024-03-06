import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {getProduct} from '../apiCall/dataApi';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    productData: [],
    jewelery: [],
    menClothing: [],
    womenclothing: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.productData = action.payload;
    },
    setJewelery: (state, action) => {
      state.jewelery = action.payload;
    },
    setMenClothing: (state, action) => {
      state.menClothing = action.payload;
    },
    setWomenClothing: (state, action) => {
      state.womenclothing = action.payload;
    },
    clearState: state => {
      state.productData = [];
      state.jewelery = [];
      state.menClothing = [];
      state.womenclothing = [];
    },
  },
});

export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async (id, {dispatch}) => {
    try {
      const products = await getProduct();
      dispatch(setProducts(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const {
  setJewelery,
  setMenClothing,
  setWomenClothing,
  setProducts,
  clearState,
} = dataSlice.actions;
export default dataSlice.reducer;
