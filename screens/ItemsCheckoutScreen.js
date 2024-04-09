import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {Colors} from '../constant/styles';
import {
  decrementCheck,
  incrementCheck,
  removeCheck,
  setClearCheck,
  setTotalPay,
} from '../store/redux/checkoutSlice';
import {useNavigation} from '@react-navigation/native';
import ButtonComponent from '../components/UI/ButtonComponent';
import IconButtonComponent from '../components/UI/IconButton';

function ItemsCheckoutScreen() {
  const checkout = useSelector(state => state.checkout.check);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(setClearCheck());
    };
  }, [dispatch]);

  useEffect(() => {
    const totalPrice = checkout.reduce(
      (acc, product) =>
        product?.quantity * (product.price * 87.37).toFixed(0) + acc,
      0,
    );
    const totalQuantity = checkout.reduce(
      (acc, product) => acc + product?.quantity,
      0,
    );

    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [checkout]);

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  function removeCartHandler(index) {
    Alert.alert(
      'Confirm',
      'Are you sure you want to remove this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            dispatch(removeCheck(index));
          },
        },
      ],
      {cancelable: false},
    );
  }
  function increaseQuantity(index) {
    dispatch(incrementCheck(index));
  }

  function decreaseQuantity(index) {
    dispatch(decrementCheck(index));
  }

  function paymentHandler() {
    dispatch(setTotalPay(totalPay.toFixed(2)));
    navigation.navigate('PaymentScreen');
  }

  if (checkout.length === 0) {
    navigation.goBack();
    return null;
  }

  let Discount = 70;
  if (totalPrice > 1500 && totalPrice < 2000) {
    Discount = 200;
  } else if (totalPrice >= 2000 && totalPrice < 3500) {
    Discount = 450;
  } else if (totalPrice >= 3500) {
    Discount = 650;
  }

  let Delivery = 80;
  if (totalPrice > 5000) {
    Delivery = 'Free';
  }

  let totalPay = totalPrice + Delivery - Discount;
  if (Delivery === 'Free') {
    totalPay = totalPrice - Discount;
  }

  return (
    <>
      <ScrollView
        style={styles.conatiner}
        contentContainerStyle={styles.scrollStyle}
        showsVerticalScrollIndicator={false}>
        {checkout.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemConatiner}
            onPress={() => detailsHandler(product.id)}>
            <Image
              source={{uri: product?.image}}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.dataConatiner}>
              <Text style={styles.itemTitle}>
                {' '}
                {product?.title?.length > 10
                  ? `${product?.title.substring(0, 25)}...`
                  : product?.title}
              </Text>
              <Text style={styles.itemPrice}>
                ₹{(product?.quantity * product?.price * 87.37).toFixed(0)}
              </Text>
              <Text style={styles.itemTitle}>Qty:{product?.quantity}</Text>
              <View style={styles.buttons}>
                <IconButtonComponent
                  icon={'plus'}
                  size={20}
                  onPress={() => increaseQuantity(index)}
                  containerColor={'#2b5c3a'}
                  iconColor={'#FFFFFF'}
                />
                <IconButtonComponent
                  icon={'trash-can-outline'}
                  onPress={() => removeCartHandler(index)}
                  size={20}
                  containerColor={'#2b5c3a'}
                  iconColor={'#FFFFFF'}
                />

                {product.quantity > 1 && (
                  <IconButtonComponent
                    icon={'minus'}
                    onPress={() => decreaseQuantity(index)}
                    size={20}
                    containerColor={'#2b5c3a'}
                    iconColor={'#FFFFFF'}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={styles.text}>
          You get free delivery when you buy 5000 or more.
        </Text>
        <View style={styles.conatiner}>
          <Text style={styles.billPrice}>Bill Details:</Text>
          <View style={styles.billContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>Total Price:</Text>
              <Text style={styles.itemPrice}>Discount:</Text>
              <Text style={styles.itemPrice}>Delivery Fee:</Text>
            </View>
            <View>
              <Text style={styles.itemPrice}>₹{totalPrice.toFixed(2)}</Text>
              <Text style={styles.itemPrice}>-₹{Discount}</Text>
              <Text style={styles.itemPrice}>₹{Delivery}</Text>
            </View>
          </View>
          <View style={styles.billContainer}>
            <Text style={styles.itemPrice}>Total Pay</Text>
            <Text style={styles.itemPrice}>₹{totalPay.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.itemSummaryContainer}>
        <View style={styles.itemSummary}>
          <View style={styles.totalConatiner}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalText}>
                Total Items: {checkout.length}
              </Text>
              <Text style={styles.totalText}>
                Total Pay: ₹{totalPay.toFixed(2)}
              </Text>
            </View>
            <ButtonComponent onPress={paymentHandler}>
              {'Place order'}
            </ButtonComponent>
          </View>
        </View>
      </View>
    </>
  );
}

export default ItemsCheckoutScreen;

const styles = StyleSheet.create({
  scrollStyle: {
    paddingBottom: 96,
  },
  conatiner: {
    marginHorizontal: 6,
    marginTop: 6,
  },
  itemConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 130,
    borderWidth: 1,
    borderColor: Colors.primary300,
    borderRadius: 10,
    marginBottom: 6,
    padding: 6,
  },
  textConatiner: {
    padding: 6,
    height: 100,
    borderWidth: 2,
    borderColor: Colors.primary300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primary300,
    fontSize: 14,
    fontFamily: 'AnekDevanagari',
    letterSpacing: 1,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
  dataConatiner: {
    width: '70%',
    padding: 4,
  },
  itemPrice: {
    fontSize: 20,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4,
  },
  totalConatiner: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  totalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
    fontSize: 20,
  },
  itemSummary: {
    backgroundColor: Colors.bgcolor,
    padding: 6,
  },
  billPrice: {
    fontSize: 20,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
  billContainer: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    padding: 4,
  },
  itemSummaryContainer: {
    backgroundColor: Colors.bgcolor,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
});
