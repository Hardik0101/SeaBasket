import React, {useRef, useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constant/styles';
import ButtonComponent from '../components/UI/ButtonComponent';
import {AuthContext} from '../store/auth-context';

const OTPScreen = () => {
  const defaultValue = '4321';
  const [otp, setOTP] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const refs = useRef([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    refs.current = refs.current.slice(0, otp.length);
  }, [otp.length]);

  const handleOTPChange = (index, value) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOTP(updatedOTP);
    if (value !== '') {
      if (index < otp.length - 1) {
        refs.current[index + 1]?.focus();
      }
    } else {
      if (index > 0) {
        refs.current[index - 1]?.focus();
      }
    }
  };

  function handleSubmit() {
    const enteredOTP = otp.join('');
    if (enteredOTP === '1234') {
      authCtx.getOtp('1234');
      navigation.navigate('Account');
      showToast('Login successful');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }

  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Enter OTP</Text>
      </View>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.input}
            secureTextEntry={true}
            mode="outlined"
            textColor="#000000"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={text => handleOTPChange(index, text)}
            theme={{colors: {primary: 'green'}}}
            ref={input => (refs.current[index] = input)}
          />
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <ButtonComponent mode="contained" onPress={handleSubmit}>
        Submit
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
    fontSize: 30,
    letterSpacing: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'AnekDevanagari',
    marginHorizontal: 2,
    backgroundColor: Colors.bgcolor,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default OTPScreen;
