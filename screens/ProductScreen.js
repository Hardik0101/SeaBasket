import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {getCategory} from '../apiCall/dataApi';
import {Colors} from '../constant/styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  fetchElectronics,
  fetchJeweleryItems,
  fetchMenClothing,
  fetchWomenClothing,
} from '../store/dataSlice';
import Button from '../components/UI/Button';
import {Cart} from '../assets/icons';
import {useNavigation} from '@react-navigation/native';

function ProductScreen() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const product = useSelector(state => state);
  const [pressed, setPressed] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const products = await getCategory();
      setData(products);
    };
    dispatch(fetchElectronics());
    dispatch(fetchJeweleryItems());
    dispatch(fetchMenClothing());
    dispatch(fetchWomenClothing());
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
        console.log('Function not implemented for this title');
    }
    setPressed(productData);
  };

  function detailsHandler() {
    navigation.navigate('Details', {
      id: pressed[0].id,
    });
  }

  return (
    <>
      <View style={styles.container}>
        {data.map((item, index) => (
          <>
            <TouchableOpacity key={index} onPress={() => getProductData(item)}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item}</Text>
              </View>
            </TouchableOpacity>
          </>
        ))}
      </View>

      {pressed && (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}>
          <>
            {pressed.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => detailsHandler(product.id)}>
                <View style={styles.imageContainer}>
                  <Image source={{uri: product.image}} style={styles.image} />
                </View>
                <View style={styles.itemTitleView}>
                  <Text style={styles.itemPrice}>${product.price}</Text>
                  <Text style={styles.itemTitle}>
                    {product.title.length > 10
                      ? `${product.title.substring(0, 20)}...`
                      : product.title}
                  </Text>
                  <View style={styles.itemButtons}>
                    <Button>
                      <Cart width={20} height={20} fill="black" />
                    </Button>
                    <Button>Buy</Button>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 6,
    paddingHorizontal: 6,
  },
  container: {
    padding: 6,
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary300,
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 2,
    padding: 6,
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: Colors.primary300,
    width: '100%',
  },
  card: {
    width: '100%',
    height: 150,
    marginTop: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: Colors.primary100,
    overflow: 'hidden',
    flexDirection: 'row',
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
    width: 120,
    height: 134,
  },
  itemTitleView: {
    width: 200,
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary300,
  },
  itemPrice: {
    marginBottom: 4,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary300,
  },
  itemButtons: {
    marginTop: 10,
    width: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    paddingBottom: 10,
  },
});

export default ProductScreen;
