import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../constant/styles';
import {Search} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllProducts} from '../../store/redux/dataSlice';
import {Searchbar} from 'react-native-paper';

function SearchCard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allproducts = useSelector(state => state.data.allproducts);

  useEffect(() => {
    function fetchProducts() {
      dispatch(fetchAllProducts());
    }
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const result = allproducts;
    setProducts(result);
    filterProducts(searchQuery, result);
  }, [allproducts, searchQuery]);

  const filterProducts = (query, products) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredProducts(filtered);
  };

  function detailsHandler(id) {
    navigation.navigate('Details', {id});
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => detailsHandler(item.id)}>
        <View style={styles.itemContainer}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {item.title.length > 10
                ? `${item.title.substring(0, 25)}...`
                : item.title}
            </Text>
            <Text style={styles.price}>₹{(item.price * 87.37).toFixed(0)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search..."
          returnKeyType="search"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          style={styles.search}
          inputStyle={styles.input}
          iconColor="#000000"
        />
        {searchQuery && (
          <>
            {filteredProducts.length > 0 ? (
              <View style={styles.list}>
                <FlatList
                  data={filteredProducts}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                />
              </View>
            ) : (
              <View style={styles.list}>
                <Text style={styles.text}>Item is not found...</Text>
              </View>
            )}
          </>
        )}
      </View>
    </>
  );
}

export default SearchCard;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 6,
    marginHorizontal: 6,
    color: Colors.primary300,
  },
  list: {
    borderColor: Colors.primary,
    borderWidth: 2,
    marginHorizontal: 6,
    borderRadius: 10,
    backgroundColor: Colors.bgcolor,
    marginTop: 4,
    overflow: 'hidden',
    maxHeight: 610,
  },
  input: {
    fontWeight: 'bold',
    margin: -8,
    color: Colors.bgcolor,
  },
  search: {
    height: 40,
    backgroundColor: Colors.primary200,
    borderRadius: 10,
    marginHorizontal: 6,
    marginTop: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary300,
    backgroundColor: Colors.primary100,
    marginBottom: 4,
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
    fontSize: 18,
    color: Colors.primary300,
    fontFamily: 'AnekDevanagari',
    textAlign: 'justify',
    marginHorizontal: 2,
  },
  price: {
    fontFamily: 'AnekDevanagari',
    fontSize: 20,
    color: Colors.primary300,
  },
});
