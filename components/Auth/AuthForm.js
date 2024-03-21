import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Input from './Input';
import ButtonComponent from '../UI/ButtonComponent';

function AuthForm({isLogin, onSubmit, credentialsInvalid}) {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    username: usernameIsInvalid,
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'username':
        setEnteredUsername(enteredValue);
        return;
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
      username: enteredUsername,
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
            placeholder="UserName"
            onUpdateValue={updateInputValueHandler.bind(this, 'username')}
            secure
            keyboardType="email-address"
            value={enteredUsername}
            isInvalid={usernameIsInvalid}
          />
          {!isLogin && (
            <>
              <Input
                placeholder="Email"
                onUpdateValue={updateInputValueHandler.bind(this, 'email')}
                secure
                keyboardType="email-address"
                value={enteredEmail}
                isInvalid={emailIsInvalid}
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

          {!isLogin && (
            <>
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
            </>
          )}

          <View style={styles.buttons}>
            {isLogin ? (
              <ButtonComponent
                icon={'login'}
                children={'Login'}
                onPress={submitHandler}
              />
            ) : (
              <ButtonComponent
                icon={'account-box-multiple'}
                children={'SignUp'}
                onPress={submitHandler}
              />
            )}
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
