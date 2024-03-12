import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {
  getAllProducts,
  getCategory,
  getElectronics,
  getJeweleryItems,
  getMenCloths,
  getProduct,
  getWomenClothing,
} from '../apiCall/dataApi';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    category: [],
    allproducts: [],
    productData: [],
    jewelery: [],
    menClothing: [],
    womenclothing: [],
    electronics: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allproducts = action.payload;
    },
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
    setElectronics: (state, action) => {
      state.electronics = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
    clearState: state => {
      (state.jewelery = []),
        (state.menClothing = []),
        (state.womenclothing = []),
        (state.electronics = []),
        (state.details = []);
    },
  },
});

export const fetchCategory = createAsyncThunk(
  'data/fetchCategory',
  async (id, {dispatch}) => {
    try {
      const products = await getCategory();
      dispatch(setCategory(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchAllProducts = createAsyncThunk(
  'data/fetchAllProducts',
  async (id, {dispatch}) => {
    try {
      const products = await getAllProducts();
      dispatch(setAllProducts(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

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

export const fetchJeweleryItems = createAsyncThunk(
  'data/fetchJeweleryItems',
  async (id, {dispatch}) => {
    try {
      const products = await getJeweleryItems();
      dispatch(setJewelery(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchMenClothing = createAsyncThunk(
  'data/fetchMenClothing',
  async (id, {dispatch}) => {
    try {
      const products = await getMenCloths();
      dispatch(setMenClothing(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchWomenClothing = createAsyncThunk(
  'data/fetchWomenClothing',
  async (id, {dispatch}) => {
    try {
      const products = await getWomenClothing();
      dispatch(setWomenClothing(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchElectronics = createAsyncThunk(
  'data/fetchElectronics',
  async (id, {dispatch}) => {
    try {
      const products = await getElectronics();
      dispatch(setElectronics(products));
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const {
  setCategory,
  setAllProducts,
  setJewelery,
  setMenClothing,
  setWomenClothing,
  setProducts,
  setElectronics,
  clearState,
} = dataSlice.actions;
export default dataSlice.reducer;
