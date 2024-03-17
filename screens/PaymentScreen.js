import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../constant/styles';
import {
  ApplePay,
  GooglePay,
  MasterCard,
  PayPal,
  Visa,
} from '../assets/paymentIcons';

function PaymentScreen() {
  const data = useSelector(state => state);

  return (
    <View style={styles.paymentConatiner}>
      <View style={styles.methods}>
        <Visa width={70} height={50} />
        <PayPal width={70} height={50} />
        <GooglePay width={70} height={50} />
        <ApplePay width={70} height={50} />
        <MasterCard width={70} height={50} />
      </View>
      <Text style={styles.totalPay}>Total Pay: ${data.check.totalPay}</Text>
    </View>
  );
}

export default PaymentScreen;
const styles = StyleSheet.create({
  paymentConatiner: {
    marginHorizontal: 6,
  },
  totalPay: {
    fontSize: 20,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary,
  },
  methods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
