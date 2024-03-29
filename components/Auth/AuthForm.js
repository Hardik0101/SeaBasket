import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from '../UI/ButtonComponent';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {setuserData} from '../../store/redux/userDataSlice';

function AuthForm({isLogin, onSubmit, credentialsInvalid}) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredMobileNumber, setEnteredMobileNumber] = useState('');
  const [enteredUsername, setEnteredUsername] = useState('');
  const dispatch = useDispatch();

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    username: usernameIsvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'mobileNumber':
        setEnteredMobileNumber(enteredValue);
        break;
      case 'username':
        setEnteredUsername(enteredValue);
        break;
      default:
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      mobileNumber: enteredMobileNumber,
      username: enteredUsername,
    });

    dispatch(
      setuserData({
        userName: enteredUsername,
        mobile: enteredMobileNumber,
        email: enteredEmail,
      }),
    );
  }

  return (
    <View style={styles.form}>
      <View>
        <Input
          placeholder="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLogin && (
          <>
            <Input
              placeholder="Mobile Number"
              onUpdateValue={updateInputValueHandler.bind(this, 'mobileNumber')}
              keyboardType="phone-pad"
              value={enteredMobileNumber}
            />
            <Input
              placeholder="Username"
              onUpdateValue={updateInputValueHandler.bind(this, 'username')}
              isInvalid={usernameIsvalid}
              value={enteredUsername}
            />
          </>
        )}
        <Input
          placeholder="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <View style={styles.buttons}>
          <ButtonComponent
            icon={isLogin ? 'login' : 'account-box-multiple'}
            children={isLogin ? 'Login' : 'SignUp'}
            onPress={submitHandler}
          />
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
