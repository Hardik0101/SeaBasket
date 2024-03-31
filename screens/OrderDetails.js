import React, {useEffect} from 'react';
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
  clearState,
  fetchElectronics,
  fetchMenClothing,
} from '../store/redux/dataSlice';
import {Colors} from '../constant/styles';

function OrderDetails() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const myOrder = useSelector(state => state.myOrder);
  const electronics = useSelector(state => state.data.electronics);
  const menClothing = useSelector(state => state.data.menClothing);

  useEffect(() => {
    function loadData() {
      dispatch(fetchElectronics());
      dispatch(fetchMenClothing());
    }
    loadData();
  }, [dispatch]);

  function orderDetailsHandler(id) {
    navigation.navigate('OredrDetails', {id});
  }

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  return (
    <>
      {myOrder.order.length > 0 ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollStyle}
          showsVerticalScrollIndicator={false}>
          {myOrder.order.map((orderItem, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              activeOpacity={0.8}
              onPress={() => orderDetailsHandler(index)}>
              {orderItem.check.map(product => (
                <View key={product.id} style={styles.itemContainer}>
                  <Image source={{uri: product.image}} style={styles.image} />
                  <View style={styles.dataContainer}>
                    <Text style={styles.itemTitle}>{product.title}</Text>
                    <Text style={styles.itemPrice}>
                      ₹{(product.price * 87.37).toFixed(0)}
                    </Text>
                  </View>
                </View>
              ))}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}> Buy New Products :) </Text>
          </View>

          <HorizontalCard
            children="Buy New Products"
            detailsHandler={detailsHandler}
            items={electronics}
          />

          <HorizontalCard
            children="Buy New Products"
            detailsHandler={detailsHandler}
            items={menClothing}
          />
        </View>
      )}
    </>
  );
}

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
    marginTop: 10,
  },
  scrollStyle: {
    paddingBottom: 90,
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.primary300,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 110,
    marginBottom: 6,
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
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemPrice: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
});
