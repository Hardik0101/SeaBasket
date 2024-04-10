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
} from '../../apiCall/dataApi';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    category: [],
    allproducts: [],
    productData: [],
    jewelery: [],
    menClothing: [],
    womenClothing: [],
    electronics: [],
  },
  reducers: {
    clearState: state => {
      (state.jewelery = []),
        (state.menClothing = []),
        (state.womenClothing = []),
        (state.electronics = []),
        (state.details = []);
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.allproducts = action.payload;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productData = action.payload;
    });
    builder.addCase(fetchJeweleryItems.fulfilled, (state, action) => {
      state.jewelery = action.payload;
    });
    builder.addCase(fetchMenClothing.fulfilled, (state, action) => {
      state.menClothing = action.payload;
    });
    builder.addCase(fetchWomenClothing.fulfilled, (state, action) => {
      state.womenClothing = action.payload;
    });
    builder.addCase(fetchElectronics.fulfilled, (state, action) => {
      state.electronics = action.payload;
    });
  },
});

export const fetchCategory = createAsyncThunk(
  'data/fetchCategory',
  async id => {
    try {
      const products = await getCategory();
      return products;
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchAllProducts = createAsyncThunk(
  'data/fetchAllProducts',
  async id => {
    try {
      const products = await getAllProducts();
      return products;
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async id => {
    try {
      const products = await getProduct();
      return products;
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchJeweleryItems = createAsyncThunk(
  'data/fetchJeweleryItems',
  async id => {
    try {
      const products = await getJeweleryItems();
      return products;
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchMenClothing = createAsyncThunk(
  'data/fetchMenClothing',
  async id => {
    try {
      const products = await getMenCloths();
      return products;
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const fetchWomenClothing = createAsyncThunk(
  'data/fetchWomenClothing',
  async id => {
    try {
      const products = await getWomenClothing();
      return products;
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
      return products;
    } catch (error) {
      console.error('Error', error);
    }
  },
);

export const {clearState} = dataSlice.actions;
export default dataSlice.reducer;
