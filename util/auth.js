import axios from 'axios';

const API_KEY = 'AIzaSyBWG4TDbVvEa6Mw5v_eX_A4qR4KR8ZewRY';

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  try {
    const response = await axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    if (response.data.email && response.data.idToken) {
      return response.data.email;
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    throw new Error('Failed to authenticate: ' + error.message);
  }
}

export function createUser(email, password) {
  return authenticate('signUp', email, password);
}

export function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}
