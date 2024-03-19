import {View, StyleSheet, Text} from 'react-native';
import Button from '../UI/Button';
import InputText from './InputText';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

function MasterCard() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [errors, setErrors] = useState({});
  const [cardValid, setCardValid] = useState(false);
  const navigation = useNavigation();

  function validateInputs() {
    const errorsObj = {};
    if (cardNumber.length !== 16) {
      errorsObj.cardNumber = 'Invalid card number';
    }

    if (expiryDate.length !== 4) {
      errorsObj.expiryDate = 'Invalid expiry date';
    }

    if (cvv.length !== 3) {
      errorsObj.cvv = 'Invalid CVV';
    }

    if (cardHolderName.length === 0) {
      errorsObj.cardHolderName = 'Card holder name is required';
    }

    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  }

  function handleCardSubmit() {
    if (
      cardNumber === '1234123412341111' &&
      cvv === '456' &&
      cardHolderName === 'seaflux technology'
    ) {
      navigation.navigate('ConfirmScreen');
    } else {
      setCardValid(true);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <InputText
          children={'Card Number'}
          keyboardType={'number-pad'}
          maxLength={16}
          placeholder={'Enter Card Number'}
          updatedValue={setCardNumber}
          value={cardNumber}
          error={errors.cardNumber}
        />
        <View style={styles.dateAndCvv}>
          <InputText
            children={'Expiry Date'}
            keyboardType={'number-pad'}
            maxLength={5}
            placeholder={'MM/YY'}
            updatedValue={setExpiryDate}
            value={expiryDate}
            error={errors.expiryDate}
          />
          <InputText
            children={'CVV'}
            keyboardType={'number-pad'}
            maxLength={3}
            placeholder={'CVV'}
            secureTextEntry={true}
            updatedValue={setCVV}
            value={cvv}
            error={errors.cvv}
          />
        </View>
        <InputText
          children={'Card Holder Name'}
          placeholder={'Enter Card Holder Name'}
          updatedValue={setCardHolderName}
          value={cardHolderName}
          error={errors.cardHolderName}
        />
        <Button
          onPress={() => {
            handleCardSubmit(), validateInputs();
          }}>
          Pay and Confirm
        </Button>
      </View>
      {cardValid && (
        <Text style={styles.text}>Please Check the Card Details</Text>
      )}
    </>
  );
}

export default MasterCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  dateAndCvv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red',
    fontFamily: 'AnekDevanagari',
    letterSpacing: 1,
  },
});
