import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products/';
const API_ALL_PRODUCTS = `${BASE_URL}?limit=8`;
const API_CATEGORY = `${BASE_URL}categories`;
const API_JEWELERY = `${BASE_URL}category/jewelery`;
const API_MENCLOTHS = `${BASE_URL}category/men's clothing`;
const API_WOMENCLOTHING = `${BASE_URL}category/women's clothing`;
const API_ELECTRONICS = `${BASE_URL}category/electronics`;
const API_DETAILS = `https://fakestoreapi.com/products/:id`;

export async function getAllProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProduct() {
  try {
    const response = await axios.get(API_ALL_PRODUCTS);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCategory() {
  try {
    const response = await axios.get(API_CATEGORY);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getJeweleryItems() {
  try {
    const response = await axios.get(API_JEWELERY);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMenCloths() {
  try {
    const response = await axios.get(API_MENCLOTHS);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getWomenClothing() {
  try {
    const response = await axios.get(API_WOMENCLOTHING);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getElectronics() {
  try {
    const response = await axios.get(
      'https://fakestoreapi.com/products/category/electronics',
    );

    // console.log('The elec api', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProductsDetails(id) {
  try {
    const response = await axios.get(API_DETAILS.replace(':id', id));
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
}
