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
import {Filter, Short} from '../../assets/icons';
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
import {filter} from './filterData.json';

function FilterData({items}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterData, setFilterData] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [data, setData] = useState([]);
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
      case 'Price Under 200':
        dataItems = itemData.filter(data => data.price <= 200);
        break;
      case 'Price 200-500':
        dataItems = itemData.filter(data => 200 < data.price < 500);
        break;
      case 'Price Above 500':
        dataItems = itemData.filter(data => data.price >= 500);
        break;
      case 'Rating':
        dataItems = itemData.filter(data => data.rating.rate >= 3);
        break;
      case 'Discount':
        console.log('The item is Discount');
        break;
      default:
        console.log('The item is Price');
        break;
    }
    setFilterData(true);
    setData(dataItems);
  }

  function filterDataHandler() {
    setFilterData(false);
  }

  if (items === null) {
    items = 'For You';
  }

  return (
    <>
      <View style={styles.filterContainer}>
        <Button onPress={() => setModalVisible(true)}>
          <View style={{flexDirection: 'row'}}>
            <Filter width={24} height={24} />
            <Text style={styles.buttonText}> Filter</Text>
          </View>
        </Button>
        <Button>
          <View style={{flexDirection: 'row'}}>
            <Short width={24} height={24} fill={Colors.secondary} />
            <Text style={styles.buttonText}> Short</Text>
          </View>
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {filter.map(filter => (
              <TouchableOpacity
                key={filter.name}
                style={styles.filterOption}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  filterHandler(filter.name);
                }}>
                <Text style={styles.textStyle}>{filter.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {filterData && (
        <>
          {data.length > 0 && (
            <ScrollView style={styles.filterData}>
              <Button onPress={filterDataHandler}>Close</Button>
              <Text style={styles.textStyle}>{items}</Text>
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => console.log('Details')}>
                  <View style={styles.itemContainer}>
                    <Image source={{uri: item.image}} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.price}>${item.price}</Text>
                      <Text style={styles.price}>{item.rating.rate}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          {data.length === 0 && (
            <View style={styles.filterData}>
              <Button onPress={filterDataHandler}>Close</Button>
              <Text style={styles.title}> Item Not Found...</Text>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary300,
    backgroundColor: Colors.primary100,
    marginTop: 4,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  textContainer: {
    width: '70%',
  },
  title: {
    fontSize: 14,
    color: Colors.primary300,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginHorizontal: 2,
  },
  price: {
    fontSize: 18,
    color: Colors.primary300,
  },

  //   Modal styles....
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  filterOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary300,
  },
  filterData: {
    backgroundColor: Colors.primary100,
    marginHorizontal: 6,
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '90%',
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
