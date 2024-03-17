import {useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../constant/styles';
import {
  ApplePay,
  GooglePay,
  MasterCard,
  PayPal,
  Visa,
} from '../assets/paymentIcons';
import {Address} from '../assets/icons';

function PaymentScreen() {
  const data = useSelector(state => state);

  return (
    <View style={styles.paymentConatiner}>
      <Text style={styles.titleText}>Order Summary</Text>
      <View style={styles.order}>
        <Text style={styles.text}>Total Pay: </Text>
        <Text style={styles.text}>${data.check.totalPay}</Text>
      </View>
      <View style={styles.payment}>
        <Text style={styles.text}>Payment</Text>
        <View style={styles.methods}>
          <Visa width={70} height={50} />
          <PayPal width={70} height={50} />
          <GooglePay width={70} height={50} />
          <ApplePay width={70} height={50} />
          <MasterCard width={70} height={50} />
        </View>
      </View>
      <View style={styles.addressComatiner}>
        <Text style={styles.text}>Address</Text>
        <View style={styles.inputTextContainer}>
          <Address width={26} height={26} />
          <TextInput style={styles.inputText} />
        </View>
      </View>
    </View>
  );
}

export default PaymentScreen;
const styles = StyleSheet.create({
  paymentConatiner: {
    marginHorizontal: 6,
  },
  text: {
    fontSize: 22,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary,
  },
  methods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginBottom: 4,
  },
  titleText: {
    fontSize: 28,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary,
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '90%',
    color: Colors.primary,
  },
});
