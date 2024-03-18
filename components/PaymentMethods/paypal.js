import {View, Text, StyleSheet} from 'react-native';

function PaypalMethod() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Paypal Method</Text>
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
