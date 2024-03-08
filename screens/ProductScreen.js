import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
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
import Button from '../components/UI/Button';
import {Cart} from '../assets/icons';
import {useNavigation} from '@react-navigation/native';

function ProductScreen() {
  const dispatch = useDispatch();
  const product = useSelector(state => state);
  const [pressed, setPressed] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
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
  };

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  return (
    <>
      <View style={styles.mainView}>
        <ScrollView horizontal style={styles.container}>
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

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          <>
            <View style={styles.twoItems}>
              {pressed.map((product, index) => (
                <>
                  <TouchableOpacity
                    key={index}
                    style={styles.card}
                    onPress={() => detailsHandler(product.id)}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri: product.image}}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.itemTitleView}>
                      <Text style={styles.itemPrice}>${product.price}</Text>
                      <Text style={styles.itemTitle}>
                        {product.title.length > 10
                          ? `${product.title.substring(0, 20)}...`
                          : product.title}
                      </Text>
                      {/* <View style={styles.itemButtons}>
                        <Button>
                          <Cart width={16} height={16} fill="black" />
                        </Button>
                        <Button>Buy</Button>
                      </View> */}
                    </View>
                  </TouchableOpacity>
                </>
              ))}
            </View>
          </>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    // flexDirection: 'row',
    height: '100%',
  },
  scrollItems: {
    marginRight: 10,
  },
  twoItems: {
    flexDirection: 'row',
    width: '100%',
    gap: 6,
    flexWrap: 'wrap',
  },

  scrollContainer: {
    padding: 6,
    paddingHorizontal: 6,
    height: '100%',
    flexDirection: 'column',
  },
  container: {
    padding: 6,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    flexDirection: 'row',
    width: '100%',
    height: 60,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary300,
    textTransform: 'capitalize',
  },
  titleContainer: {
    padding: 6,
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.primary300,
    width: '100%',
  },
  card: {
    width: '49%',
    height: 230,
    marginTop: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: Colors.primary100,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary300,
  },
  imageContainer: {
    width: 130,
    height: 150,
  },
  itemTitleView: {
    width: 160,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary300,
  },
  itemPrice: {
    marginBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary300,
  },
  itemButtons: {
    marginTop: 10,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 10,
  },
  activeTitleContainer: {
    backgroundColor: '#2e8b57',
  },
  activeTitle: {
    color: Colors.secondary,
  },
});

export default ProductScreen;
