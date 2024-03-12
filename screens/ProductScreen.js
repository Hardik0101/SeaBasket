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
import ItemScrollView from '../components/AppData/itemScrollCard';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import FilterData from '../components/AppData/FilterData';

function ProductScreen() {
  const dispatch = useDispatch();
  const product = useSelector(state => state);
  const [pressed, setPressed] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [items, setItems] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchCategory()),
        await dispatch(fetchAllProducts()),
        await dispatch(fetchElectronics()),
        await dispatch(fetchJeweleryItems()),
        await dispatch(fetchMenClothing()),
        await dispatch(fetchWomenClothing()),
        setTimeout(() => {
          setLoading(false);
        }, 1000);
    }
    fetchData();
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingOverlay children="Loading..." />
      </View>
    );
  }

  return (
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
              style={[styles.title, activeItem === null && styles.activeTitle]}>
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
      <FilterData items={activeItem} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
