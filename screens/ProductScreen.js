import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
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
  const category = useSelector(state => state.data.category);
  const menClothing = useSelector(state => state.data.menClothing);
  const womenClothing = useSelector(state => state.data.womenclothing);
  const electronics = useSelector(state => state.data.electronics);
  const jewelery = useSelector(state => state.data.jewelery);
  const allproducts = useSelector(state => state.data.allproducts);
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
          key={'ForYou'}
          onPress={() => getProductData()}
          style={[
            styles.titleContainer,
            activeItem === null && styles.activeTitleContainer,
          ]}
          textStyle={[styles.title, activeItem === null && styles.activeTitle]}>
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

      {/* ******************* Filter Section *******************/}
      <FilterData items={activeItem} />
      {/* ******************* Item Section *******************/}

      {items && (
        <ItemScrollCard items={pressed} detailsHandler={detailsHandler} />
      )}
      {!items && (
        <ItemScrollCard items={allproducts} detailsHandler={detailsHandler} />
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
