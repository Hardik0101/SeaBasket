import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products/';
const API_ALL_PRODUCTS = `${BASE_URL}?limit=8`;
const API_CATEGORY = `${BASE_URL}categories`;
const API_CATEGORY_DATA = `${BASE_URL}category/jewelery`;

export async function getProduct() {
  try {
    const response = await axios.get(API_ALL_PRODUCTS);
    console.log('Response is ', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCategory() {
  try {
    const response = await axios.get(API_CATEGORY);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getJeweleryItems() {
  try {
    const response = await axios.get(API_CATEGORY_DATA);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
