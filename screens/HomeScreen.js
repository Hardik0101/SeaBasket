import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constant/styles';
import AddCard from '../components/DataShow/addCard';
import HorizontalCard from '../components/DataShow/HorizontalCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/dataSlice';
import {useNavigation} from '@react-navigation/native';

function HomeScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(fetchElectronics());
    dispatch(fetchJeweleryItems());
    dispatch(fetchMenClothing());
    dispatch(fetchWomenClothing());
    return () => {
      dispatch(clearState());
    };
  }, []);

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.dataContainer}>
          <AddCard />
        </View>
        <View>
          <HorizontalCard
            children="New Electronic"
            detailsHandler={detailsHandler}
            items={data.data.electronics}
          />
        </View>
        <View>
          <HorizontalCard
            children="New Jewelery"
            detailsHandler={detailsHandler}
            items={data.data.jewelery}
          />
        </View>
      </ScrollView>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    flex: 1,
  },
  dataContainer: {
    marginHorizontal: 6,
    borderRadius: 12,
    height: 210,
    borderWidth: 2,
    borderColor: Colors.primary300,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingBottom: 6,
  },
});
