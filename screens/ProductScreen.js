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
} from '../store/redux/dataSlice';
import {useNavigation} from '@react-navigation/native';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import FilterData from '../components/AppData/FilterData';
import ItemScrollCard from '../components/AppData/itemScrollCard';
import {Chip} from 'react-native-paper';

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
      dispatch(fetchCategory()),
        dispatch(fetchAllProducts()),
        dispatch(fetchElectronics()),
        dispatch(fetchJeweleryItems()),
        dispatch(fetchMenClothing()),
        dispatch(fetchWomenClothing()),
        setTimeout(() => {
          setLoading(false);
        }, 2000);
    }
    fetchData();
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  function getProductData(item) {
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
  }

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
        horizontal={true}
        style={styles.container}
        contentContainerStyle={styles.contentContainerHorizontal}>
        <Chip
          onPress={() => getProductData()}
          style={[
            styles.titleContainer,
            activeItem === null && styles.activeTitleContainer,
          ]}
          textStyle={[styles.title, activeItem === null && styles.activeTitle]}>
          For You
        </Chip>
        {product.data.category.map((item, index) => (
          <>
            <Chip
              onPress={() => getProductData(item)}
              style={[
                styles.titleContainer,
                activeItem === item && styles.activeTitleContainer,
              ]}
              textStyle={[
                styles.title,
                activeItem === item && styles.activeTitle,
              ]}>
              {item}
            </Chip>
          </>
        ))}
      </ScrollView>

      {/* ******************* Filter Section *******************/}
      <FilterData items={activeItem} />
      {/* ******************* Item Section *******************/}

      {items && (
        <ItemScrollCard items={pressed} detailsHandler={detailsHandler} />
      )}
      {!items && (
        <ItemScrollCard
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
  container: {
    padding: 6,
    flexDirection: 'row',
    height: 58,
    borderBottomWidth: 1,
    borderColor: Colors.primary300,
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
    color: Colors.primary300,
    textTransform: 'capitalize',
  },
  titleContainer: {
    borderColor: Colors.primary300,
    marginRight: 6,
    backgroundColor: Colors.bgcolor,
    borderWidth: 2,
    padding: 2,
    justifyContent: 'center',
  },
  contentContainerHorizontal: {
    paddingEnd: 6,
  },
  activeTitleContainer: {
    backgroundColor: Colors.primary300,
  },
  activeTitle: {
    color: Colors.bgcolor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
