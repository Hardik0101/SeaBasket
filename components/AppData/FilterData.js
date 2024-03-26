import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from '../../constant/styles';
import {
  clearState,
  fetchAllProducts,
  fetchCategory,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../../store/redux/dataSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {filter, short} from './filterData.json';
import ItemScrollCard from './itemScrollCard';
import FilterModalComponent from './FilterModalComponent';
import ButtonComponent from '../UI/ButtonComponent';

function FilterData({items}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterTitles, setFilterTitles] = useState([]);
  const [filterData, setFilterData] = useState(false);
  const [typeItems, setTypeItems] = useState('');
  const [itemData, setItemData] = useState([]);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const menClothing = useSelector(state => state.data.menClothing);
  const womenClothing = useSelector(state => state.data.womenclothing);
  const electronics = useSelector(state => state.data.electronics);
  const jewelery = useSelector(state => state.data.jewelery);
  const allproducts = useSelector(state => state.data.allproducts);
  //Fetch The all Data from redux
  useEffect(() => {
    function fetchData() {
      dispatch(fetchCategory());
      dispatch(fetchAllProducts());
      dispatch(fetchElectronics());
      dispatch(fetchJeweleryItems());
      dispatch(fetchMenClothing());
      dispatch(fetchWomenClothing());
    }
    fetchData();
    return () => {
      dispatch(clearState());
    };
  }, []);

  //Set Items base on Active Items
  useEffect(() => {
    DataHandler(items);
  }, [items]);

  //Active item data are stored in setItemData
  function DataHandler(selectedItem) {
    let productData = null;
    switch (selectedItem) {
      case "men's clothing":
        productData = menClothing;
        break;
      case "women's clothing":
        productData = womenClothing;
        break;
      case 'jewelery':
        productData = jewelery;
        break;
      case 'electronics':
        productData = electronics;
        break;
      default:
        productData = allproducts;
        break;
    }
    setItemData(productData);
  }

  // Apply Filter Data by Filter type
  function filterHandler(item) {
    let dataItems = [];
    switch (item) {
      case 'Price Under ₹500':
        dataItems = itemData.filter(data => data.price * 87.37 <= 500);
        break;
      case 'Price:₹500-₹1000':
        dataItems = itemData.filter(
          data => data.price * 87.37 < 1000 && data.price * 87.37 > 500,
        );
        break;
      case 'Price Over ₹1000':
        dataItems = itemData.filter(data => data.price * 87.37 >= 1000);
        break;
      case 'Rating 2 & Up':
        dataItems = itemData.filter(data => data.rating.rate >= 2);
        break;
      case 'Rating 3 & Up':
        dataItems = itemData.filter(data => data.rating.rate >= 3);
        break;
      case 'Rating 4 & Up':
        dataItems = itemData.filter(data => data.rating.rate >= 4);
        break;
      case 'Price:Low to High':
        dataItems = itemData.filter(data => data.price);
        dataItems.sort((a, b) => a.price - b.price);
        break;
      case 'Price:High to Low':
        dataItems = itemData.filter(data => data.price);
        dataItems.sort((a, b) => b.price - a.price);
        break;
      case 'Name: A to Z':
        dataItems = itemData.filter(data => data.price);
        dataItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Name: Z to A':
        dataItems = itemData.filter(data => data.price);
        dataItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        dataItems = itemData.filter(
          data =>
            data.price * 87.37 < filterTitles[1] &&
            data.price * 87.37 > filterTitles[0],
        );

        break;
    }

    setFilterData(true);
    setData(dataItems);
    setFilterTitles(item);
  }

  //Filtered data show in this function
  function filterDataHandler() {
    setFilterData(false);
  }

  //Show Details Fnction
  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  let title;
  if (typeof filterTitles === 'string') {
    title = filterTitles;
  } else {
    title = `₹${filterTitles[0]} - ₹${filterTitles[1]}`;
  }

  return (
    <>
      {/* Two Button Filter and Sort */}
      <View style={styles.filterContainer}>
        <ButtonComponent
          buttonColor={'#2b5c3a'}
          color={'#FFFFFF'}
          icon={'filter-variant'}
          onPress={() => {
            setModalVisible(true), setTypeItems('filter');
          }}
          children={'Filter'}
        />
        <ButtonComponent
          buttonColor={'#2b5c3a'}
          color={'#FFFFFF'}
          icon={'sort-variant'}
          onPress={() => {
            setModalVisible(true), setTypeItems('sort');
          }}
          children={'Sort'}
        />
      </View>

      {/* Open Modal Base on typeItems Filter and Sort */}
      {typeItems === 'filter' && (
        <FilterModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          filterHandler={filterHandler}
          typeItems={filter}
          type={'filter'}
        />
      )}

      {typeItems === 'sort' && (
        <FilterModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          filterHandler={filterHandler}
          typeItems={short}
          type={'sort'}
        />
      )}

      {/* Filtered Data Display */}
      {filterData && (
        <>
          {data.length > 0 && (
            <View style={styles.filterData}>
              <View style={styles.canclebutton}>
                <ButtonComponent onPress={filterDataHandler}>
                  Close
                </ButtonComponent>
              </View>
              <Text style={styles.filterTitle}>{title}</Text>
              <ItemScrollCard items={data} detailsHandler={detailsHandler} />
            </View>
          )}
          {data.length === 0 && (
            <View style={styles.filterData}>
              <View style={styles.canclebutton}>
                <ButtonComponent onPress={filterDataHandler}>
                  Close
                </ButtonComponent>
              </View>
              <Text style={styles.title}>Item is not Found...</Text>
            </View>
          )}
        </>
      )}
    </>
  );
}

export default FilterData;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 6,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.bgcolor,
    fontSize: 20,
    fontFamily: 'AnekDevanagari',
  },
  title: {
    fontSize: 24,
    color: Colors.primary300,
    textAlign: 'center',
    marginHorizontal: 2,
    fontFamily: 'AnekDevanagari',
  },
  filterTitle: {
    fontSize: 18,
    color: Colors.primary300,
    textAlign: 'center',
    margin: 4,
    fontFamily: 'AnekDevanagari',
  },
  filterData: {
    backgroundColor: Colors.bgcolor,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  canclebutton: {
    padding: 4,
  },
});
