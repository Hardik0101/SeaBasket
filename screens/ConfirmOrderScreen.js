import React, {useEffect} from 'react';
import {Text, View, StyleSheet, BackHandler} from 'react-native';
import {Tick} from '../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constant/styles';
import ButtonComponent from '../components/UI/ButtonComponent';
import {useDispatch, useSelector} from 'react-redux';
import {clearState} from '../store/redux/cartSlice';

function ConfirmScreen() {
  const navigation = useNavigation();
  const data = useSelector(data => data);
  const dispatch = useDispatch();

  useEffect(() => {
    function backAction() {
      navigation.navigate('Home');
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    if (data.carts.cart.length === data.check.check.length) {
      dispatch(clearState());
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Tick width={100} height={100} />
      <Text style={styles.text}>Order Confirmed !</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textMessage}>
          Your order has been successfully.
        </Text>
        <ButtonComponent onPress={() => navigation.navigate('Home')}>
          {'Continue Shopping'}
        </ButtonComponent>
      </View>
    </View>
  );
}

export default ConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary,
    marginBottom: 20,
  },
  textMessage: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'AnekDevanagari',
    color: Colors.primary,
    marginBottom: 8,
  },
});
