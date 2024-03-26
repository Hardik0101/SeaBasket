import {View, Text, StyleSheet, TextInput} from 'react-native';
import InputText from './InputText';
import ButtonComponent from '../UI/ButtonComponent';

function PaypalMethod() {
  return (
    <View style={styles.container}>
      <InputText children={'Paypal id'} placeholder={'Enter Paypal ID'} />
      <InputText
        children={'Password'}
        placeholder={'Enter Paypal Password'}
        secureTextEntry={true}
      />

      <ButtonComponent>{'Pay and Confirm'}</ButtonComponent>
    </View>
  );
}

export default PaypalMethod;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  text: {
    fontSize: 22,
    fontFamily: 'AnekDevanagari',
  },
});
