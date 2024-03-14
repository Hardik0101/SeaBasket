import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import HorizontalCard from '../components/AppData/HorizontalCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/dataSlice';
import {Colors} from '../constant/styles';
import Button from '../components/UI/Button';
import {Minus, Plus} from '../assets/icons';
import {removeCart} from '../store/cartSlice';

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
  }, []);

  useEffect(() => {
    const totalPrice = data.carts.cart.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    const totalQuantity = data.carts.cart.reduce((acc, product) => acc + 1, 0);
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [data.carts.cart]);

  function byProductHandler() {
    navigation.navigate('Product');
  }

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  function removeCartHandler(id) {
    dispatch(removeCart(id));
  }

  return (
    <>
      <ScrollView
        style={styles.conatiner}
        contentContainerStyle={styles.scrollStyle}
        showsVerticalScrollIndicator={false}>
        {data.carts.cart.length > 0 && (
          <>
            {data.carts.cart.map((product, index) => (
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
                  <Text style={styles.itemPrice}>${product?.price}</Text>
                  <Text style={styles.itemTitle}>Qty:1</Text>
                  <View style={styles.buttons}>
                    <Button>
                      <Plus width={18} height={18} />
                    </Button>
                    <Button onPress={() => removeCartHandler(index)}>
                      <Minus width={18} height={18} />
                    </Button>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <View>
              <View style={styles.totalConatiner}>
                <View style={styles.totalTextContainer}>
                  <Text style={styles.totalText}>
                    Total Items: {totalQuantity}{' '}
                  </Text>
                  <Text style={styles.totalText}>
                    Total Price: ${totalPrice.toFixed(2)}
                  </Text>
                </View>
                <Button>Buy Now</Button>
              </View>
            </View>
          </>
        )}

        {data.carts.cart.length === 0 && (
          <>
            <View style={styles.textConatiner}>
              <Text style={styles.text}> The Cart is Empty :) </Text>
            </View>
            <View>
              <HorizontalCard
                children="Buy New Products"
                detailsHandler={byProductHandler}
                items={data.data.electronics}
              />
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  scrollStyle: {
    paddingBottom: 6,
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
});
