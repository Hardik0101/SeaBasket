import {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Button from '../UI/Button';
import Input from './Input';
import {Cart, Login, Signup} from '../../assets/icons';

function AuthForm({isLogin, onSubmit, credentialsInvalid}) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <>
      <View style={styles.form}>
        <View>
          <Input
            placeholder="Email / UserName"
            onUpdateValue={updateInputValueHandler.bind(this, 'email')}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
          />
          <Input
            placeholder="Password"
            onUpdateValue={updateInputValueHandler.bind(this, 'password')}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
          />
          {!isLogin && (
            <Input
              placeholder="Confirm Password"
              onUpdateValue={updateInputValueHandler.bind(
                this,
                'confirmPassword',
              )}
              secure
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
            />
          )}
          <View style={styles.buttons}>
            <Button onPress={submitHandler}>
              {isLogin ? (
                <Login fill={'black'} width={26} height={26} />
              ) : (
                <Signup fill={'black'} width={26} height={26} />
              )}
            </Button>
          </View>
        </View>
      </View>
    </>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
