import React, {useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import {AuthContext} from '../../store/auth-context';
import LoadingOverlay from '../../components/UI/LoadingOverlay';
import {login} from '../../util/auth';
import {useDispatch} from 'react-redux';
import {setuserData} from '../../store/redux/userDataSlice';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      dispatch(setuserData({email: token}));
      authCtx.authenticate(token);
      authCtx.getOtp(token);
      setIsAuthenticating(false);
    } catch (error) {
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!',
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/images/Logo.png')}
        />
      </View>
      <ImageBackground
        source={require('../../assets/images/Login.png')}
        style={styles.bgImage}
        imageStyle={styles.image}>
        <View style={styles.auth}>
          <AuthContent isLogin onAuthenticate={loginHandler} />
        </View>
      </ImageBackground>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  auth: {
    width: '100%',
    height: '100%',
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    opacity: 0.1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '36%',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
});
