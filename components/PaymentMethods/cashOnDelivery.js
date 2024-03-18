import {View, Text, StyleSheet} from 'react-native';

function CashOnDeliveryMethod() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>CashOnDelivery Method</Text>
    </View>
  );
}

export default CashOnDeliveryMethod;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
  },
  text: {
    fontSize: 22,
    fontFamily: 'AnekDevanagari',
  },
});
