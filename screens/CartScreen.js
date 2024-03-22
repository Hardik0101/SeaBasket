import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import HorizontalCard from '../components/AppData/HorizontalCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/redux/dataSlice';
import {Colors} from '../constant/styles';
import {
  decrementCart,
  incrementCart,
  removeCart,
} from '../store/redux/cartSlice';
import {setCheck} from '../store/redux/checkoutSlice';
import ButtonComponent from '../components/UI/ButtonComponent';
import IconButtonComponent from '../components/UI/IconButton';

function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    function loadData() {
      dispatch(fetchElectronics());
      dispatch(fetchJeweleryItems());
      dispatch(fetchMenClothing());
      dispatch(fetchWomenClothing());
    }
    loadData();
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  useEffect(() => {
    const totalPrice = data.carts.cart.reduce(
      (acc, product) => product?.quantity * product?.price + acc,
      0,
    );
    const totalQuantity = data.carts.cart.reduce(
      (acc, product) => acc + product?.quantity,
      0,
    );
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [data.carts.cart]);

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
            dispatch(removeCart(index));
          },
        },
      ],
      {cancelable: false},
    );
  }

  function increaseQuantity(index) {
    dispatch(incrementCart(index));
  }

  function decreaseQuantity(index) {
    dispatch(decrementCart(index));
  }

  function checkoutItems() {
    {
      data.carts.cart.map(items => {
        dispatch(setCheck(items));
      });
    }
    navigation.navigate('CheckoutScreen');
  }

  return (
    <>
      {data.carts.cart.length > 0 && (
        <ScrollView
          style={styles.conatiner}
          contentContainerStyle={styles.scrollStyle}
          showsVerticalScrollIndicator={false}>
          <>
            {data.carts.cart.map((product, index) => (
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
                    ${(product?.quantity * product?.price).toFixed(2)}
                  </Text>
                  <Text style={styles.itemTitle}>Qty:{product.quantity}</Text>
                  <View style={styles.buttons}>
                    <IconButtonComponent
                      icon={'plus'}
                      size={20}
                      onPress={() => increaseQuantity(index)}
                      containerColor={'#2b5c3a'}
                      iconColor={'#FFFFFF'}
                    />
                    <ButtonComponent
                      buttonColor={'#2b5c3a'}
                      color={'#FFFFFF'}
                      onPress={() => removeCartHandler(index)}
                      children={'Remove'}
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
          </>
        </ScrollView>
      )}
      {data.carts.cart.length > 0 && (
        <View style={styles.itemSummary}>
          <View style={styles.totalConatiner}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalText}>
                Total Items: {data.carts.cart.length}
              </Text>
              <Text style={styles.totalText}>
                Total Price: ${totalPrice.toFixed(2)}
              </Text>
            </View>
            <ButtonComponent
              onPress={checkoutItems}
              buttonColor={'#2b5c3a'}
              color={'#FFFFFF'}>
              {'Buy Now'}
            </ButtonComponent>
          </View>
        </View>
      )}
      {data.carts.cart.length === 0 && (
        <>
          <View style={styles.conatiner}>
            <View style={styles.textConatiner}>
              <Text style={styles.text}> Your Cart is Empty :) </Text>
            </View>

            <HorizontalCard
              children="Buy New Products"
              detailsHandler={detailsHandler}
              items={data.data.electronics}
            />

            <HorizontalCard
              children="Buy New Products"
              detailsHandler={detailsHandler}
              items={data.data.menClothing}
            />
          </View>
        </>
      )}
    </>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  scrollStyle: {
    paddingBottom: 90,
  },
  conatiner: {
    marginHorizontal: 6,
    marginTop: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primary300,
    fontSize: 22,
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
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4,
  },
  totalConatiner: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    padding: 8,
  },
  totalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
    fontSize: 22,
  },
  itemSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    padding: 6,
    backgroundColor: Colors.bgcolor,
  },
});
