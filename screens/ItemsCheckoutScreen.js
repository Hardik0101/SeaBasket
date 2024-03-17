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
import {fetchJeweleryItems} from '../store/redux/dataSlice';
import {Colors} from '../constant/styles';
import Button from '../components/UI/Button';
import {Minus, Plus} from '../assets/icons';
import {
  decrementCheck,
  incrementCheck,
  removeCheck,
  setClearCheck,
  setTotalPay,
} from '../store/redux/checkoutSlice';
import {useNavigation} from '@react-navigation/native';

function ItemsCheckoutScreen() {
  const data = useSelector(state => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    dispatch(fetchJeweleryItems());
  }, [dispatch]);

  useEffect(() => {
    const totalPrice = data.check.check.reduce(
      (acc, product) => product?.quantity * product?.price + acc,
      0,
    );
    const totalQuantity = data.check.check.reduce(
      (acc, product) => acc + product?.quantity,
      0,
    );

    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [data.check.check]);

  useEffect(() => {
    return () => {
      dispatch(setClearCheck());
    };
  }, [dispatch]);

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

  if (data.check.check.length === 0) {
    navigation.goBack();
    return null;
  }

  let Discount = 15.5;
  if (totalPrice > 300 && totalPrice < 600) {
    Discount = 50;
  } else if (totalPrice >= 600 && totalPrice < 1200) {
    Discount = 70.8;
  } else if (totalPrice >= 1200) {
    Discount = 170.8;
  }

  let Delivery = 20;
  if (totalPrice > 500) {
    Delivery = 'Free';
  }
  const totalPay = totalPrice + Delivery - Discount;

  return (
    <>
      <ScrollView
        style={styles.conatiner}
        contentContainerStyle={styles.scrollStyle}
        showsVerticalScrollIndicator={false}>
        {data.check.check.map((product, index) => (
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
                {product?.quantity} *${product?.price} = $
                {(product?.quantity * product?.price).toFixed(2)}
              </Text>
              <Text style={styles.itemTitle}>Qty:{product?.quantity}</Text>
              <View style={styles.buttons}>
                <Button onPress={() => increaseQuantity(index)}>
                  <Plus width={20} height={20} />
                </Button>
                <Button onPress={() => removeCartHandler(index)}>Remove</Button>

                {product.quantity > 1 && (
                  <Button onPress={() => decreaseQuantity(index)}>
                    <Minus width={20} height={20} />
                  </Button>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.conatiner}>
          <Text style={styles.billPrice}>Bill Details:</Text>
          <View style={styles.billContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>Total Price:</Text>
              <Text style={styles.itemPrice}>Discount:</Text>
              <Text style={styles.itemPrice}>Delivery Fee:</Text>
            </View>
            <View>
              <Text style={styles.itemPrice}>${totalPrice.toFixed(2)}</Text>
              <Text style={styles.itemPrice}>-${Discount}</Text>
              <Text style={styles.itemPrice}>${Delivery}</Text>
            </View>
          </View>
          <View style={styles.billContainer}>
            <Text style={styles.itemPrice}>Total Pay</Text>
            <Text style={styles.itemPrice}>${totalPay.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.itemSummaryContainer}>
        <View style={styles.itemSummary}>
          <View style={styles.totalConatiner}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalText}>
                Total Items: {totalQuantity}{' '}
              </Text>
              <Text style={styles.totalText}>
                Total Pay: ${totalPay.toFixed(2)}
              </Text>
            </View>
            <Button onPress={paymentHandler}>Place order</Button>
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
    borderWidth: 2,
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
    fontSize: 18,
    fontFamily: 'AnekDevanagari',
    letterSpacing: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: 16,
    color: Colors.primary300,
    fontFamily: 'AnekDevanagari',
  },
  dataConatiner: {
    width: '70%',
    padding: 4,
  },
  itemPrice: {
    fontSize: 20,
    color: Colors.primary300,
    fontFamily: 'AnekDevanagari',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
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
    color: Colors.primary300,
    fontFamily: 'AnekDevanagari',
    fontSize: 20,
  },
  itemSummary: {
    backgroundColor: Colors.bgcolor,
    borderColor: Colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 6,
  },
  billPrice: {
    fontSize: 20,
    color: Colors.primary300,
    fontFamily: 'AnekDevanagari',
  },
  billContainer: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
