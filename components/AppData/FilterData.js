import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors} from '../../constant/styles';
import {
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
import SortModalComponent from './SortModalComponent';

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
  }, [dispatch]);

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

  function priceAndRateFilter(item) {
    const max = Math.max(...item);
    const min = Math.min(...item);
    let dataItems = [];
    dataItems = itemData.filter(
      data =>
        data.rating.rate < max + 1 &&
        data.rating.rate > min &&
        data.price * 87.37 < filterTitles[1] &&
        data.price * 87.37 > filterTitles[0],
    );
    setFilterData(true);
    setData(dataItems);
  }

  // Apply Filter Data by Filter type
  function filterHandler(item) {
    let dataItems = [];
    switch (item) {
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
        dataItems = [];
        break;
    }
    setFilterData(true);
    setData(dataItems);
    setFilterTitles(item);
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
          priceAndRateFilter={priceAndRateFilter}
          typeItems={filter}
          type={'filter'}
        />
      )}

      {typeItems === 'sort' && (
        <SortModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          filterHandler={filterHandler}
          typeItems={short}
        />
      )}

      {/* Filtered Data Display */}
      {filterData && (
        <>
          {data.length > 0 && (
            <ItemScrollCard items={data} detailsHandler={detailsHandler} />
          )}
          {data.length === 0 && (
            <View style={styles.filterData}>
              <Text style={styles.title}>Item is not Found...</Text>
            </View>
          )}
        </>
      )}

      {!filterData && (
        <ItemScrollCard items={itemData} detailsHandler={detailsHandler} />
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
  canclebutton: {
    padding: 4,
  },
});
