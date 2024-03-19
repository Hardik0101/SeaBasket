import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TextInput} from 'react-native';
import Button from '../UI/Button';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../constant/styles';

function CashOnDeliveryMethod() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  function ConfirmHandler() {
    setModalVisible(true);
  }

  function handleOTPSubmit() {
    if (otp === '1234') {
      navigation.navigate('ConfirmScreen');
      setModalVisible(false);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={ConfirmHandler}>Confirm The Order</Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={[styles.input, error ? styles.errorInput : null]}
              placeholder="Enter OTP"
              placeholderTextColor={'gray'}
              maxLength={4}
              onChangeText={text => {
                setOTP(text);
                setError('');
              }}
              value={otp}
              keyboardType="numeric"
              secureTextEntry={true}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button onPress={handleOTPSubmit}>Confirm</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CashOnDeliveryMethod;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.primary100,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: Colors.primary,
    fontFamily: 'AnekDevanagari',
    fontSize: 18,
    padding: 2,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
