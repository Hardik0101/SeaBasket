import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../constant/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  fetchAllProducts,
  fetchCategory,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/dataSlice';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/UI/Button';
import {Filter, Short} from '../assets/icons';
import ItemScrollView from '../components/AppData/itemScrollCard';

function ProductScreen() {
  const dispatch = useDispatch();
  const product = useSelector(state => state);
  const [pressed, setPressed] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [items, setItems] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchAllProducts());
    dispatch(fetchElectronics());
    dispatch(fetchJeweleryItems());
    dispatch(fetchMenClothing());
    dispatch(fetchWomenClothing());
    return () => {
      dispatch(clearState());
    };
  }, []);

  const getProductData = async item => {
    let productData = null;
    switch (item) {
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
        item = null;
        productData = product.data.allproducts;
        break;
    }

    setPressed(productData);
    setActiveItem(item);
    setItems(true);
  };

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  function filterHandler() {
    console.log('Filter Press1');
  }

  return (
    <>
      <View style={styles.mainView}>
        {/* ******************* Catagory selction ******************* */}
        <ScrollView
          horizontal
          style={styles.container}
          contentContainerStyle={styles.contentContainerHorizontal}>
          <TouchableOpacity
            onPress={() => getProductData()}
            style={styles.scrollItems}>
            <View
              style={[
                styles.titleContainer,
                activeItem === null && styles.activeTitleContainer,
              ]}>
              <Text
                style={[
                  styles.title,
                  activeItem === null && styles.activeTitle,
                ]}>
                For You
              </Text>
            </View>
          </TouchableOpacity>

          {product.data.category.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => getProductData(item)}
              style={styles.scrollItems}>
              <View
                style={[
                  styles.titleContainer,
                  activeItem === item && styles.activeTitleContainer,
                ]}>
                <Text
                  style={[
                    styles.title,
                    activeItem === item && styles.activeTitle,
                  ]}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ******************* Filter Section *******************/}

        <View style={styles.filterContainer}>
          <Button onPress={filterHandler}>
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

        {/* ******************* Item Section *******************/}

        {items && (
          <ItemScrollView items={pressed} detailsHandler={detailsHandler} />
        )}
        {!items && (
          <ItemScrollView
            items={product.data.allproducts}
            detailsHandler={detailsHandler}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
  },
  scrollItems: {
    marginRight: 6,
  },
  container: {
    padding: 6,
    flexDirection: 'row',
    width: '100%',
    height: 56,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary300,
    textTransform: 'capitalize',
  },
  titleContainer: {
    padding: 4,
    backgroundColor: Colors.primary100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary300,
    width: '100%',
  },
  contentContainerHorizontal: {
    paddingEnd: 6,
  },
  activeTitleContainer: {
    backgroundColor: '#2e8b57',
  },
  activeTitle: {
    color: Colors.secondary,
  },
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
});

export default ProductScreen;
