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
  const [filterTitles, setFilterTitles] = useState('');
  const [filterData, setFilterData] = useState(false);
  const [typeItems, setTypeItems] = useState('');
  const [itemData, setItemData] = useState([]);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const product = useSelector(state => state);

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
        productData = product.data.menClothing;
        break;
      case "women's clothing":
        productData = product.data.womenclothing;
        break;
      case 'jewelery':
        productData = product.data.jewelery;
        break;
      case 'electronics':
        productData = product.data.electronics;
        break;
      default:
        productData = product.data.allproducts;
        break;
    }
    setItemData(productData);
  }

  // Apply Filter Data by Filter type
  function filterHandler(item) {
    let dataItems = [];
    switch (item) {
      case 'Price Under $100':
        dataItems = itemData.filter(data => data.price <= 100);
        break;
      case 'Price:$100-$500':
        dataItems = itemData.filter(
          data => data.price < 500 && data.price > 100,
        );
        break;
      case 'Price Over $500':
        dataItems = itemData.filter(data => data.price >= 500);
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
        console.log('The item is Price');
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

  //Set items name of null is "For You"
  if (items === null) {
    items = 'For You';
  }

  //Show Details Fnction
  function detailsHandler(id) {
    navigation.navigate('Details', {id});
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
        />
      )}

      {typeItems === 'sort' && (
        <FilterModalComponent
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
            <View style={styles.filterData}>
              <View style={styles.canclebutton}>
                <ButtonComponent onPress={filterDataHandler}>
                  Close
                </ButtonComponent>
              </View>
              <Text style={styles.filterTitle}>{filterTitles}</Text>
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
