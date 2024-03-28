import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {clearUserDataState} from './redux/userDataSlice';

export const AuthContext = createContext({
  token: '',
  gtoken: '',
  otp: '',
  isAuthenticated: false,
  isGuest: false,
  isOtp: false,
  authenticate: function (token) {},
  logout: function () {},
  getOtp: function (otp) {},
  setGuestUserToken: function (gtoken) {},
});

function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState('');
  const [guestToken, setGuestToken] = useState('');
  const [otp, setOtp] = useState('');
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
  function getOtp(otp) {
    setOtp(otp);
    AsyncStorage.setItem('otp', otp)
      .then(() => console.log('OTP stored successfully'))
      .catch(error => console.log('Error storing otp:', error));
  }

  function logout() {
    setAuthToken('');
    setOtp('');
    dispatch(clearUserDataState());
    AsyncStorage.removeItem('authToken')
      .then(() => {
        console.log('Token removed successfully');
      })
      .catch(error => {
        console.log('Error removing authToken:', error);
      });

    AsyncStorage.removeItem('otp')
      .then(() => {
        console.log('OTP removed successfully');
      })
      .catch(error => {
        console.log('Error removing otp:', error);
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

    AsyncStorage.getItem('otp')
      .then(otp => {
        if (otp) {
          setOtp(otp);
        }
      })
      .catch(error => console.log('Error retrieving otp:', error));
  }, []);

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setGuestUserToken: setGuestUserToken,
    isGuest: !!guestToken,
    gtoken: guestToken,
    isOtp: !!otp,
    otp: otp,
    getOtp: getOtp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
