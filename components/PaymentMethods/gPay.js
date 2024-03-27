import {View, StyleSheet, Text} from 'react-native';
import InputText from './InputText';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '../UI/ButtonComponent';

function GooglePay() {
  const [upiId, setUpiId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [upiValid, setUpiValid] = useState(false);
  const navigation = useNavigation();

  function validateInputs() {
    const errorsObj = {};
    if (upiId.length !== 10) {
      errorsObj.upiId = 'Invalid UPI id';
    }

    if (password.length < 4) {
      errorsObj.password = 'Invalid Password';
    }

    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }

  function handleupiSubmit() {
    if (upiId === '0987654321' && password === '15052021') {
      navigation.navigate('ConfirmScreen');
    } else {
      setUpiValid(true);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <InputText
          children={'UPI id'}
          keyboardType={'number-pad'}
          maxLength={16}
          placeholder={'Enter UPI id'}
          updatedValue={setUpiId}
          value={upiId}
          error={errors.upiId}
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
            handleupiSubmit(), validateInputs();
          }}>
          {'Pay and Confirm'}
        </ButtonComponent>
      </View>
      {upiValid && (
        <Text style={styles.text}>Please Check the upi Details</Text>
      )}
    </>
  );
}

export default GooglePay;

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
