import axios from 'axios';
const API_URL_LOGIN = 'https://fakestoreapi.com/auth/login';
const API_URL_USER = 'https://fakestoreapi.com/users';

async function login(username, password) {
  try {
    const response = await axios.post(API_URL_LOGIN, {
      username: 'mor_2314',
      password: '83r5^_',
    });
    console.log('login', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function newUser(username, email, password, address, mobile) {
  try {
    const response = await axios.post(API_URL_USER, {
      username,
      email,
      password,
      address,
      mobile,
    });
    console.log('newUser', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export {login, newUser};
