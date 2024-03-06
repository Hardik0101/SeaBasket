import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import {getProduct} from '../../apiCall/dataApi';
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
  console.log('This is data', data);
  return (
    <ScrollView horizontal style={styles.container}>
      <>
        <View style={styles.card}>
          <Image
            source={{uri: data.productData}}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.title}>{data.productData}</Text>
        </View>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
    paddingHorizontal: 4,
  },
  card: {
    marginRight: 10,
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: Colors.primary100,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary300,
  },
});

export default HorizontalCard;
