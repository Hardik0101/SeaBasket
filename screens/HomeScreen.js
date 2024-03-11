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
} from '../store/dataSlice';
import {useNavigation} from '@react-navigation/native';
import SearchCard from '../components/AppData/SearchCard';
import LoadingOverlay from '../components/UI/LoadingOverlay';

function HomeScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchElectronics());
      await dispatch(fetchJeweleryItems());
      await dispatch(fetchMenClothing());
      await dispatch(fetchWomenClothing());
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    loadData();

    return () => {
      dispatch(clearState());
    };
  }, []);

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  return (
    <>
      <SearchCard />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingOverlay children="Loading..." />
        </View>
      ) : (
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
      )}
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
