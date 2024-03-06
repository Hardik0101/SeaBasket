import React from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import {useNavigation} from '@react-navigation/native';
import {login} from '../../apiCall/authApi';

function LoginScreen() {
  const navigation = useNavigation();

  const handleLogin = async (username, password) => {
    try {
      const response = await login(username, password);
      console.log('Login successful:', response);
      navigation.navigate('New');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/images/Login.png')}
        style={styles.bgImage}
        imageStyle={styles.image}>
        <View style={styles.auth}>
          <AuthContent isLogin onAuthenticate={handleLogin} />
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
  },
  bgImage: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    opacity: 0.1,
  },
});
