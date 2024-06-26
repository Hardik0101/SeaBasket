import {View, StyleSheet, Text} from 'react-native';
import InputText from './InputText';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '../UI/ButtonComponent';

function ApplePay() {
  const [appleId, setAppleId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [appleValid, setAppleValid] = useState(false);
  const navigation = useNavigation();

  function validateInputs() {
    const errorsObj = {};
    if (appleId.length !== 10) {
      errorsObj.appleId = 'Invalid apple id';
    }

    if (password.length < 4) {
      errorsObj.password = 'Invalid Password';
    }

    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }

  function handleappleSubmit() {
    if (appleId === '0987654321' && password === '15052021') {
      navigation.navigate('ConfirmScreen');
    } else {
      setAppleValid(true);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <InputText
          children={'apple id'}
          keyboardType={'number-pad'}
          maxLength={16}
          placeholder={'Enter apple id'}
          updatedValue={setAppleId}
          value={appleId}
          error={errors.appleId}
        />
        <InputText
          children={'Password'}
          keyboardType={'number-pad'}
          maxLength={10}
          placeholder={'Enter password'}
          updatedValue={setPassword}
          value={password}
          secureTextEntry={true}
          error={errors.password}
        />

        <ButtonComponent
          onPress={() => {
            handleappleSubmit(), validateInputs();
          }}>
          {'Pay and Confirm'}
        </ButtonComponent>
      </View>
      {appleValid && (
        <Text style={styles.text}>Please Check the apple Details</Text>
      )}
    </>
  );
}

export default ApplePay;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    fontFamily: 'AnekDevanagari',
    letterSpacing: 1,
  },
});
