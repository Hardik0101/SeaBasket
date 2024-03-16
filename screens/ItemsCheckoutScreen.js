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

  if (data.check.check.length === 0) {
    navigation.goBack();
    return null;
  }

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
            <View style={styles.imageConatiner}>
              <Image
                source={{uri: product?.image}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
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
                  <Plus width={18} height={18} />
                </Button>
                <Button onPress={() => removeCartHandler(index)}>Remove</Button>

                {product.quantity > 1 && (
                  <Button onPress={() => decreaseQuantity(index)}>
                    <Minus width={18} height={18} />
                  </Button>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={styles.billPrice}>Bill Details</Text>
        <View style={styles.conatiner}>
          <View style={styles.billContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.itemPrice}>Total Price:</Text>
              <Text style={styles.itemPrice}>Discount:</Text>
              <Text style={styles.itemPrice}>Delivery Fee:</Text>
            </View>
            <View>
              <Text style={styles.itemPrice}>${totalPrice}</Text>
              <Text style={styles.itemPrice}>$-50.80</Text>
              <Text style={styles.itemPrice}>F̶r̶e̶e̶ $28</Text>
            </View>
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
                Total Pay: ${totalPrice.toFixed(2)}
              </Text>
            </View>
            <Button onPress={() => {}}>plase order</Button>
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
    marginTop: 10,
  },
  itemConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
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
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  imageConatiner: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary100,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: 16,
    color: Colors.primary300,
    fontWeight: 'bold',
  },
  dataConatiner: {
    width: '70%',
    padding: 4,
  },
  itemPrice: {
    fontSize: 20,
    color: Colors.primary300,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
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
    marginBottom: 10,
  },
  totalText: {
    color: Colors.primary300,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
