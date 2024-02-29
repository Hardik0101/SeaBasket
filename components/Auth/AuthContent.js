import {Alert, Image, StyleSheet, View, ScrollView} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AuthForm from './AuthForm';
import {Colors} from '../../constant/styles';
import FlatButton from '../UI/FlatButton';

function AuthContent({isLogin, onAuthenticate}) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let {email, password, confirmPassword} = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(
        password,
      );

    const emailsAreEqual = email;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || (!isLogin && !emailsAreEqual)) {
      Alert.alert('Invalid input', 'Please check your entered Email.');
      setCredentialsInvalid({
        email: !emailIsValid,
      });
      return;
    } else if (!passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      Alert.alert(
        'Invalid input',
        'Please enter Strong Password like aBc@#123',
      );
      setCredentialsInvalid({
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({email, password});
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.authContent}>
          <AuthForm
            isLogin={isLogin}
            onSubmit={submitHandler}
            credentialsInvalid={credentialsInvalid}
          />
          <View style={styles.buttons}>
            <FlatButton onPress={switchAuthModeHandler}>
              {isLogin ? 'Create a new user' : 'Login'}
            </FlatButton>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 40,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary100,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
  },
});
