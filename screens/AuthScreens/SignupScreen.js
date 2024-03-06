import React from 'react';
import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import {Cart, Logo} from '../../assets/icons';
import {Colors} from '../../constant/styles';
import {newUser} from '../../apiCall/authApi';
import {useNavigation} from '@react-navigation/native';

function SignupScreen() {
  const navigation = useNavigation();

  const handleUser = async (username, email, password) => {
    try {
      const response = await newUser(username, email, password);
      console.log('New User successful:', response);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Create new user is failed:', error.message);
    }
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to SeaBasket</Text>
          <Logo width={28} height={28} fill={Colors.primary300} />
        </View>
        <ImageBackground
          source={require('../../assets/images/SignUp.png')}
          style={styles.bgImage}
          imageStyle={styles.image}>
          <View style={styles.auth}>
            <AuthContent isLogin={false} onAuthenticate={handleUser} />
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    marginBottom: -10,
    flexDirection: 'row',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 6,
  },
  auth: {
    width: '100%',
    marginTop: -10,
  },
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
