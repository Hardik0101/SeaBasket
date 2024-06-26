import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Dialog, Portal, Button} from 'react-native-paper';
import HorizontalCard from '../components/AppData/HorizontalCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../constant/styles';
import {
  decrementCart,
  incrementCart,
  removeCart,
} from '../store/redux/cartSlice';
import {setCheck} from '../store/redux/checkoutSlice';
import ButtonComponent from '../components/UI/ButtonComponent';
import IconButtonComponent from '../components/UI/IconButton';
import {AuthContext} from '../store/auth-context';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function CartScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const carts = useSelector(state => state.cart.cart);
  const electronics = useSelector(state => state.data.electronics);
  const menClothing = useSelector(state => state.data.menClothing);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  useEffect(() => {
    const totalPrice = carts.reduce(
      (acc, product) => product?.quantity * product?.price * 87.37 + acc,
      0,
    );
    const totalQuantity = carts.reduce(
      (acc, product) => acc + product?.quantity,
      0,
    );
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [carts]);

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  function removeCartHandler(index) {
    setSelectedIndex(index);
    setVisible(true);
  }

  function increaseQuantity(index) {
    dispatch(incrementCart(index));
  }

  function decreaseQuantity(index) {
    dispatch(decrementCart(index));
  }

  function checkoutItems() {
    carts.forEach(items => {
      dispatch(setCheck(items));
    });
    if (!authCtx.isAuthenticated) {
      setVisible(true);
    } else {
      navigation.navigate('Order');
    }
  }

  const hideDialog = () => setVisible(false);

  const removeItem = () => {
    dispatch(removeCart(selectedIndex));
    hideDialog();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingOverlay children="Loading..." />
      </View>
    );
  }

  return (
    <>
      <Portal>
        <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={styles.dialogText}>Confirm</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogMessage}>
              Are you sure you want to remove this item?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={styles.dialogButton} onPress={hideDialog}>
              Cancel
            </Button>
            <Button labelStyle={styles.dialogButton} onPress={removeItem}>
              Remove
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {carts.length > 0 && (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollStyle}
          showsVerticalScrollIndicator={false}>
          {carts.map((product, index) => (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => detailsHandler(product.id)}>
              <Image
                source={{uri: product?.image}}
                style={styles.image}
                resizeMode="contain"
              />

              <View style={styles.dataContainer}>
                <Text style={styles.itemTitle}>
                  {product?.title?.length > 10
                    ? `${product?.title.substring(0, 25)}...`
                    : product?.title}
                </Text>
                <Text style={styles.itemPrice}>
                  ₹{(product?.quantity * product?.price * 87.37).toFixed(0)}
                </Text>
                <Text style={styles.itemTitle}>Qty: {product.quantity}</Text>
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
        </ScrollView>
      )}
      {carts.length > 0 && (
        <View style={styles.itemSummary}>
          <View style={styles.totalContainer}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalText}>Total Items: {carts.length}</Text>
              <Text style={styles.totalText}>
                Total Price: ₹{totalPrice.toFixed(0)}
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
      {carts.length === 0 && (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Your Cart is Empty :)</Text>
          </View>

          <HorizontalCard
            key="electronics"
            children="Buy New Products"
            detailsHandler={detailsHandler}
            items={electronics}
          />

          <HorizontalCard
            key="menClothing"
            children="Buy New Products"
            detailsHandler={detailsHandler}
            items={menClothing}
          />
        </View>
      )}
    </>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginTop: 10,
  },
  scrollStyle: {
    paddingBottom: 90,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 130,
    borderWidth: 1,
    borderColor: Colors.primary300,
    borderRadius: 10,
    marginBottom: 6,
    padding: 6,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
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
  dataContainer: {
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
  itemSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    padding: 6,
    backgroundColor: Colors.bgcolor,
  },
  totalContainer: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 170,
  },
  dialogText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.primary300,
  },
  dialogMessage: {
    letterSpacing: 1,
    fontSize: 14,
    color: Colors.primary200,
  },
  dialogButton: {
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary300,
  },
});
