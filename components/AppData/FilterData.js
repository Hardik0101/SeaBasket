import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {Colors} from '../../constant/styles';
import Button from '../UI/Button';
import {Cancel, Filter, Short} from '../../assets/icons';
import {
  clearState,
  fetchAllProducts,
  fetchCategory,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../../store/dataSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {filter, short} from './filterData.json';
import ItemScrollCard from './itemScrollCard';
import ModalComponent from './ModalComponent';

function FilterData({items}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterData, setFilterData] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [data, setData] = useState([]);
  const [filterTitles, setFilterTitles] = useState('');
  const [typeItems, setTypeItems] = useState('');
  const navigation = useNavigation();
  const product = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchCategory());
      await dispatch(fetchAllProducts());
      await dispatch(fetchElectronics());
      await dispatch(fetchJeweleryItems());
      await dispatch(fetchMenClothing());
      await dispatch(fetchWomenClothing());
    }
    fetchData();
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    DataHandler(items);
  }, [items]);

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
      default:
        console.log('The item is Price');
        break;
    }
    setFilterData(true);
    setData(dataItems);
    setFilterTitles(item);
  }

  function filterDataHandler() {
    setFilterData(false);
  }

  if (items === null) {
    items = 'For You';
  }

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  return (
    <>
      <View style={styles.filterContainer}>
        <Button
          onPress={() => {
            setModalVisible(true), setTypeItems('filter');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Filter width={24} height={24} />
            <Text style={styles.buttonText}>Filter</Text>
          </View>
        </Button>
        <Button
          short
          onPress={() => {
            setModalVisible(true), setTypeItems('sort');
          }}>
          <View style={{flexDirection: 'row'}}>
            <Short width={24} height={24} fill={Colors.secondary} />
            <Text style={styles.buttonText}> Sort</Text>
          </View>
        </Button>
      </View>

      {typeItems === 'filter' && (
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          filterHandler={filterHandler}
          typeItems={filter}
        />
      )}

      {typeItems === 'sort' && (
        <ModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          filterHandler={filterHandler}
          typeItems={short}
        />
      )}

      {filterData && (
        <>
          {data.length > 0 && (
            <View style={styles.filterData}>
              <View style={styles.canclebutton}>
                <Button onPress={filterDataHandler}>Close</Button>
              </View>
              <Text style={styles.filterTitle}>{filterTitles}</Text>
              <ItemScrollCard items={data} detailsHandler={detailsHandler} />
            </View>
          )}
          {data.length === 0 && (
            <View style={styles.filterData}>
              <View style={styles.canclebutton}>
                <Button onPress={filterDataHandler}>Close</Button>
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
    color: Colors.secondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: Colors.primary300,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 2,
  },
  filterTitle: {
    fontSize: 18,
    color: Colors.primary300,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 4,
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
