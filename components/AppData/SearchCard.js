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

function SearchCard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector(state => state);

  useEffect(() => {
    function fetchProducts() {
      dispatch(fetchAllProducts());
    }
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const result = data.data.allproducts;
    setProducts(result);
    filterProducts(searchQuery, result);
  }, [data.data.allproducts, searchQuery]);

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
      <TouchableOpacity onPress={() => detailsHandler(item.id)}>
        <View style={styles.itemContainer}>
          <Image source={{uri: item.image}} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {item.title.length > 10
                ? `${item.title.substring(0, 25)}...`
                : item.title}
            </Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            returnKeyType="search"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
          <Search width={28} height={28} />
        </View>
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
    height: 500,
    overflow: 'hidden',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 4,
    marginHorizontal: 6,
  },
  input: {
    flex: 1,
    height: 40,
    color: Colors.secondary,
    fontWeight: 'bold',
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
    fontSize: 16,
    color: Colors.primary300,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginHorizontal: 2,
  },
  price: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.primary300,
  },
});
