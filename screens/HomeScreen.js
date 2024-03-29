import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Colors} from '../constant/styles';
import AddCard from '../components/AppData/addCard';
import HorizontalCard from '../components/AppData/HorizontalCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/redux/dataSlice';
import {useNavigation} from '@react-navigation/native';
import SearchCard from '../components/AppData/SearchCard';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function HomeScreen() {
  const dispatch = useDispatch();
  const jewelery = useSelector(state => state.data.jewelery);
  const electronics = useSelector(state => state.data.electronics);
  const menClothing = useSelector(state => state.data.menClothing);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    function loadData() {
      dispatch(fetchElectronics());
      dispatch(fetchJeweleryItems());
      dispatch(fetchMenClothing());
      dispatch(fetchWomenClothing());
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
    loadData();

    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  return (
    <>
      <View style={styles.searchBar}>
        <SearchCard />
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingOverlay children="Loading..." />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.addContainer}>
            <AddCard />
          </View>
          <View style={styles.dataContainer}>
            <HorizontalCard
              key="menClothing"
              children="New For Men"
              detailsHandler={detailsHandler}
              items={menClothing}
            />

            <HorizontalCard
              key="electronics"
              children="New Electronic"
              detailsHandler={detailsHandler}
              items={electronics}
            />

            <HorizontalCard
              key="jewelery"
              children="New Jewelery"
              detailsHandler={detailsHandler}
              items={jewelery}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    top: 0,
    left: 0,
  },
  container: {
    marginTop: 50,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataContainer: {
    marginLeft: 6,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingBottom: 6,
  },
  addContainer: {
    marginHorizontal: 6,
    borderRadius: 12,
    height: 180,
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
  },
});
