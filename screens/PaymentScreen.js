import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../constant/styles';
import {Address} from '../assets/icons';
import {useState} from 'react';
import Button from '../components/UI/Button';
import PaymentIcons from './PaymentIcons.json';
import VisaMethod from '../components/PaymentMethods/visa';
import PaypalMethod from '../components/PaymentMethods/paypal';
import CashOnDeliveryMethod from '../components/PaymentMethods/cashOnDelivery';
import GooglePay from '../components/PaymentMethods/gPay';
import ApplePay from '../components/PaymentMethods/applePay';
import MasterCard from '../components/PaymentMethods/masterCard';

function PaymentScreen() {
  const data = useSelector(state => state);
  const [address, setAddress] = useState(false);
  const [input, setInput] = useState(
    'B-405, Navratna Corporate Park, Ambli Rd, Ashok Vatika,Ahmedabad, Gujarat 380058',
  );

  const [select, setSelect] = useState(false);
  const [activeItem, setActiveItem] = useState(false);

  // Payment methods States
  const [selectPayment, setSelectPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState([]);

  function AddressHandler(text) {
    setInput(text);
  }

  function PaymentMethodHandler(item) {
    let payment = null;
    switch (item) {
      case 'visa':
        payment = <VisaMethod />;
        break;
      case 'paypal':
        payment = <PaypalMethod />;
        break;
      case 'google_pay':
        payment = <GooglePay />;
        break;
      case 'apple_pay':
        payment = <ApplePay />;
        break;
      case 'mastercard':
        payment = <MasterCard />;
        break;
      case 'cash_on_delivery':
        payment = <CashOnDeliveryMethod />;
        break;
      default:
        payment = null;
        break;
    }
    setActiveItem(item);
    setSelectPayment(true);
    setPaymentMethod(payment);
  }

  return (
    <ScrollView
      style={styles.paymentConatiner}
      contentContainerStyle={{paddingBottom: 10}}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.titleText}>Order Summary</Text>
      <View style={styles.order}>
        <Text style={styles.text}>Total Pay: </Text>
        <Text style={styles.text}>${data.check.totalPay}</Text>
      </View>
      <View style={styles.addressComatiner}>
        <Text style={styles.text}>Address:</Text>
        <View style={styles.inputTextContainer}>
          <Address width={28} height={28} />
          {!address && (
            <Text
              style={[styles.addressText, select && styles.selectableAddress]}>
              {input}
            </Text>
          )}
          {address && (
            <TextInput
              style={styles.inputText}
              placeholder="Enter your New Address"
              placeholderTextColor={Colors.primary300}
              value={input}
              onChangeText={setInput}
            />
          )}
        </View>

        <View style={styles.buttons}>
          <Button onPress={() => setAddress(true)}>Edit</Button>
          {!select && (
            <Text style={styles.textMessage}>Please select the address ➤</Text>
          )}
          {!address && (
            <Button
              onPress={() => {
                setSelect(true);
              }}>
              {select ? 'Selected' : 'Select'}
            </Button>
          )}

          {address && (
            <Button
              onPress={() => {
                setAddress(false);
                setSelect(false);
                AddressHandler(input);
              }}>
              Done
            </Button>
          )}
        </View>
      </View>
      {select && (
        <View style={styles.payment}>
          <Text style={styles.text}>Payment:</Text>
          <Text style={styles.textMessage}>
            Please Select the Payment Method ➤
          </Text>
          <View style={styles.methods}>
            {PaymentIcons.payment_icons.map((icon, index) => (
              <>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => PaymentMethodHandler(icon.name)}
                  key={index}
                  style={[
                    styles.paymentType,
                    activeItem === icon.name && styles.paymentTypeSelect,
                  ]}>
                  <Image
                    key={index}
                    source={{uri: icon.image}}
                    style={{width: 50, height: 30}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </>
            ))}
          </View>
          {selectPayment && (
            <View style={styles.paymentMethod}>{paymentMethod}</View>
          )}
        </View>
      )}
    </ScrollView>
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
    color: Colors.text,
  },
  methods: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
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
    color: Colors.text,
  },
  inputTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectableAddress: {
    backgroundColor: Colors.primary200,
    color: 'white',
  },
  inputText: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: '90%',
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
    fontSize: 18,
  },
  addressText: {
    fontSize: 16,
    fontFamily: 'AnekDevanagari',
    color: Colors.text,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 4,
    width: '90%',
    textAlign: 'justify',
  },
  textMessage: {
    fontSize: 16,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginHorizontal: 8,
    gap: 20,
  },
  payment: {
    marginTop: 10,
  },
  paymentType: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 4,
  },
  paymentTypeSelect: {
    backgroundColor: Colors.primary100,
  },
  payOnDelivery: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  payText: {
    textAlign: 'center',
    fontFamily: 'AnekDevanagari',
    fontSize: 20,
    color: Colors.text,
  },
  paymentMethod: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 8,
    marginTop: 10,
  },
});
