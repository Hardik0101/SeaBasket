import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../constant/styles';
import Button from '../UI/Button';

function VisaMethod() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.cardNumber}>
          <Text style={styles.text}>Card Number</Text>
          <TextInput
            style={styles.inputText}
            keyboardType="number-pad"
            placeholder="Enter Card Number"
            placeholderTextColor={Colors.primary100}
            maxLength={16}
          />
        </View>
        <View style={styles.dateAndCvv}>
          <View>
            <Text style={styles.text}>Expiry Date</Text>
            <TextInput
              style={styles.inputText}
              keyboardType="number-pad"
              placeholder="MM/YY"
              placeholderTextColor={Colors.primary100}
              maxLength={5}
            />
          </View>
          <View>
            <Text style={styles.text}>CVV</Text>
            <TextInput
              style={styles.inputText}
              keyboardType="number-pad"
              placeholder="Enter CVV"
              placeholderTextColor={Colors.primary100}
              maxLength={3}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.cardHolder}>
          <Text style={styles.text}>Card Holder Name</Text>
          <TextInput
            style={styles.inputText}
            placeholder="Enter Card Holder Name"
            placeholderTextColor={Colors.primary100}
            maxLength={16}
          />
        </View>
        <Button>Pay and Confirm</Button>
      </View>
    </>
  );
}

export default VisaMethod;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  text: {
    fontSize: 18,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary,
  },
  inputText: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    color: Colors.primary,
    fontFamily: 'AnekDevanagari',
    fontSize: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textAlign: 'center',
  },
  cardNumber: {
    marginBottom: 10,
  },
  dateAndCvv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardHolder: {
    marginBottom: 10,
  },
});
