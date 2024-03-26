import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View, ImageBackground, Alert} from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import {Logo} from '../../assets/icons';
import {createUser} from '../../util/auth';
import {AuthContext} from '../../store/auth-context';
import LoadingOverlay from '../../components/UI/LoadingOverlay';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
      setIsAuthenticating(false);
    } catch {
      Alert.alert(
        'Authentication failed!',
        'Could not create user. Please check your credentials and try later!',
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to SeaBasket</Text>
          <Logo width={28} height={28} />
        </View>
        <ImageBackground
          source={require('../../assets/images/SignUp.png')}
          style={styles.bgImage}
          imageStyle={styles.image}>
          <View style={styles.auth}>
            <AuthContent onAuthenticate={signupHandler} />
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
    fontSize: 30,
    fontFamily: 'AnekDevanagari',
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
