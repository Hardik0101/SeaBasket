import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../constant/styles';
import {useDispatch, useSelector} from 'react-redux';
import {clearState, fetchProducts, setProducts} from '../../store/dataSlice';

const HorizontalCard = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state);

  useEffect(() => {
    dispatch(fetchProducts());
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);
  return (
    <ScrollView horizontal style={styles.container}>
      {data?.data?.productData.map((product, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            console.log('Details', product.id);
          }}>
          <View style={styles.card}>
            <Image source={{uri: product.image}} style={styles.image} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
  },
  card: {
    marginRight: 10,
    width: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: Colors.primary100,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary300,
  },
});

export default HorizontalCard;
