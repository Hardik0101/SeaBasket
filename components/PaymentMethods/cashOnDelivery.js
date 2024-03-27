import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constant/styles';
import {Modal, Button} from 'react-native-paper';
import ButtonComponent from '../UI/ButtonComponent';

function CashOnDeliveryMethod() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const refs = useRef([]);

  function ConfirmHandler() {
    setModalVisible(true);
  }

  function handleOTPSubmit() {
    const enteredOTP = otp.join('');
    if (enteredOTP === '1234') {
      navigation.navigate('ConfirmScreen');
      setModalVisible(false);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }

  const handleOTPChange = (index, value) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = value;
    setOTP(updatedOTP);
    if (value !== '') {
      if (index < otp.length - 1) {
        refs.current[index + 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <ButtonComponent onPress={ConfirmHandler}>
        {'Confirm The Order'}
      </ButtonComponent>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalView}>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              secureTextEntry={true}
              style={[styles.input, error ? styles.errorInput : null]}
              placeholder="0"
              placeholderTextColor={'gray'}
              maxLength={1}
              onChangeText={text => handleOTPChange(index, text)}
              value={digit}
              keyboardType="numeric"
              ref={input => (refs.current[index] = input)}
            />
          ))}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <ButtonComponent onPress={handleOTPSubmit}>Confirm</ButtonComponent>
      </Modal>
    </View>
  );
}

export default CashOnDeliveryMethod;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  modalView: {
    backgroundColor: Colors.primary100,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
    height: 200,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: 'AnekDevanagari',
    fontSize: 18,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
