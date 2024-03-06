import axios from 'axios';

const API_ALL_PRODUCTS = 'https://fakestoreapi.com/products';

export async function getProduct() {
  try {
    const response = await axios.get(API_ALL_PRODUCTS);
    console.log('Response is ', response.data);
    return response.data.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
