import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products/';
const API_ALL_PRODUCTS = `${BASE_URL}?limit=8`;
const API_CATEGORY = `${BASE_URL}categories`;
const API_JEWELERY = `${BASE_URL}category/jewelery`;
const API_MENCLOTHS = `${BASE_URL}category/men's clothing`;
const API_WOMENCLOTHING = `${BASE_URL}category/women's clothing`;
const API_ELECTRONICS = `${BASE_URL}category/electronics`;

export async function getAllProducts() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('Response is ', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
    const response = await axios.get(API_JEWELERY);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMenCloths() {
  try {
    const response = await axios.get(API_MENCLOTHS);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getWomenClothing() {
  try {
    const response = await axios.get(API_WOMENCLOTHING);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getElectronics() {
  try {
    const response = await axios.get(API_ELECTRONICS);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
