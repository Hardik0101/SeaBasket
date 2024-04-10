import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {Colors} from '../constant/styles';
import {useSelector, useDispatch} from 'react-redux';
import FilterData from '../components/AppData/FilterData';
import {Chip} from 'react-native-paper';
import ProductScreenShimmer from '../components/ShimmerScreen/ProductScreenShimmer';
import {
  fetchAllProducts,
  fetchCategory,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/redux/dataSlice';

function ProductScreen() {
  const dispatch = useDispatch();
  const category = useSelector(state => state.data.category);
  const menClothing = useSelector(state => state.data.menClothing);
  const womenClothing = useSelector(state => state.data.womenclothing);
  const electronics = useSelector(state => state.data.electronics);
  const jewelery = useSelector(state => state.data.jewelery);
  const allproducts = useSelector(state => state.data.allproducts);
  const [pressed, setPressed] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);

    dispatch(fetchElectronics());
    dispatch(fetchJeweleryItems());
    dispatch(fetchMenClothing());
    dispatch(fetchWomenClothing());
    dispatch(fetchCategory());
    dispatch(fetchAllProducts());

    setTimeout(() => {
      setRefreshing(false);
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  useEffect(() => {
    function fetchData() {
      try {
        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function getProductData(item) {
    let productData = null;
    switch (item) {
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
        item = null;
        productData = allproducts;
        break;
    }

    setPressed(productData);
    setActiveItem(item);
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      {loading ? (
        <ProductScreenShimmer />
      ) : (
        <>
          <View style={styles.mainView}>
            {/* ******************* Catagory selction ******************* */}
            <ScrollView
              horizontal={true}
              style={styles.container}
              contentContainerStyle={styles.contentContainerHorizontal}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <Chip
                key={'ForYou'}
                onPress={() => getProductData()}
                style={[
                  styles.titleContainer,
                  activeItem === null && styles.activeTitleContainer,
                ]}
                textStyle={[
                  styles.title,
                  activeItem === null && styles.activeTitle,
                ]}>
                For You
              </Chip>
              {category.map((item, index) => (
                <Chip
                  key={index.toString()}
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
              ))}
            </ScrollView>
          </View>

          {/* ******************* Filter Section *******************/}
          <FilterData items={activeItem} />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    flexDirection: 'row',
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
  errorMessage: {
    fontSize: 24,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductScreen;
