import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, RefreshControl} from 'react-native';
import AddCard from '../components/AppData/addCard';
import HorizontalCard from '../components/AppData/HorizontalCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllProducts,
  fetchCategory,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/redux/dataSlice';
import {useNavigation} from '@react-navigation/native';
import SearchCard from '../components/AppData/SearchCard';
import HomeShimmer from '../components/ShimmerScreen/HomeShimmer';

function HomeScreen() {
  const dispatch = useDispatch();
  const jewelery = useSelector(state => state.data.jewelery);
  const electronics = useSelector(state => state.data.electronics);
  const menClothing = useSelector(state => state.data.menClothing);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);

    dispatch(fetchElectronics());
    dispatch(fetchJeweleryItems());
    dispatch(fetchMenClothing());
    dispatch(fetchWomenClothing());
    dispatch(fetchCategory());
    dispatch(fetchAllProducts());

    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 2000);
  }, [dispatch]);

  useEffect(() => {
    function loadData() {
      dispatch(fetchElectronics());
      dispatch(fetchJeweleryItems());
      dispatch(fetchMenClothing());
      dispatch(fetchWomenClothing());
      dispatch(fetchCategory());
      dispatch(fetchAllProducts());
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    loadData();
  }, [dispatch]);

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  return (
    <>
      {isLoading ? (
        <HomeShimmer />
      ) : (
        <>
          <View style={styles.searchBar}>
            <SearchCard />
          </View>
          <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.addContainer}>
              <AddCard />
            </View>
            <View style={styles.dataContainer}>
              <HorizontalCard
                children="New For Men"
                detailsHandler={detailsHandler}
                items={menClothing}
              />

              <HorizontalCard
                children="New Electronic"
                detailsHandler={detailsHandler}
                items={electronics}
              />

              <HorizontalCard
                children="New Jewelery"
                detailsHandler={detailsHandler}
                items={jewelery}
              />
            </View>
          </ScrollView>
        </>
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
