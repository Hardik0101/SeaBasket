import {View, Text, StyleSheet, TextInput} from 'react-native';
import InputText from './InputText';
import Button from '../UI/Button';

function PaypalMethod() {
  return (
    <View style={styles.container}>
      <InputText children={'Paypal id'} placeholder={'Enter Paypal ID'} />
      <InputText
        children={'Password'}
        placeholder={'Enter Paypal Password'}
        secureTextEntry={true}
      />

      <Button>Pay and Confirm</Button>
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
