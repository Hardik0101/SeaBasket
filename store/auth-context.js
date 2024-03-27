import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {clearUserDataState} from './redux/userDataSlice';

export const AuthContext = createContext({
  token: '',
  gtoken: '',
  isAuthenticated: false,
  isGuest: false,
  authenticate: function (token) {},
  logout: function () {},
  setGuestUserToken: function (gtoken) {},
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState('');
  const [guestToken, setGuestToken] = useState('');
  const dispatch = useDispatch();

  function setGuestUserToken(gtoken) {
    setGuestToken(gtoken);
    AsyncStorage.setItem('guestToken', gtoken)
      .then(() => console.log('Guest token stored successfully'))
      .catch(error => console.log('Error storing guest token:', error));
  }

  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('authToken', token)
      .then(() => console.log('Token stored successfully'))
      .catch(error => console.log('Error storing token:', error));
  }

  function logout() {
    setAuthToken('');
    dispatch(clearUserDataState());
    AsyncStorage.removeItem('authToken')
      .then(() => {
        console.log('Token removed successfully');
      })
      .catch(error => {
        console.log('Error removing authToken:', error);
      });
  }

  useEffect(() => {
    AsyncStorage.getItem('authToken')
      .then(token => {
        if (token) {
          authenticate(token);
        }
      })
      .catch(error => console.log('Error retrieving token:', error));

    AsyncStorage.getItem('guestToken')
      .then(gtoken => {
        if (gtoken) {
          setGuestUserToken(gtoken);
        }
      })
      .catch(error => console.log('Error retrieving guest token:', error));
  }, []);

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setGuestUserToken: setGuestUserToken,
    isGuest: !!guestToken,
    gtoken: guestToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
