import {Alert, StyleSheet, View, ScrollView} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constant/styles';
import AuthForm from './AuthForm';
import {Button} from 'react-native-paper';

function AuthContent({isLogin, onAuthenticate}) {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    mobile: false,
    username: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function submitHandler(credentials) {
    let {email, password, username, mobile} = credentials;
    email = email.trim();
    password = password.trim();
    username = username;
    mobile = mobile;

    const emailIsValid = email.includes('@');
    const passwordIsValid =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(
        password,
      );
    if (!emailIsValid) {
      Alert.alert('Invalid input', 'Please check your entered Email.');
      return;
    }

    if (!passwordIsValid) {
      Alert.alert(
        'Invalid input',
        'Please enter Strong Password like aBc@#123',
      );
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
            <Button textColor="#2b5c3a" onPress={switchAuthModeHandler}>
              {isLogin ? 'Create a new user' : 'Login'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginHorizontal: 30,
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
    borderRadius: 8,
    marginTop: 16,
  },
});
