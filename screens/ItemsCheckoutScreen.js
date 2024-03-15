import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {fetchJeweleryItems} from '../store/redux/dataSlice';
import {Colors} from '../constant/styles';
import Button from '../components/UI/Button';
import {Minus, Plus} from '../assets/icons';

function ItemsCheckoutScreen({type, items}) {
  const data = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJeweleryItems());
  });

  return (
    <>
      <ScrollView
        style={styles.conatiner}
        contentContainerStyle={styles.scrollStyle}
        showsVerticalScrollIndicator={false}>
        {data.data.jewelery.map((product, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemConatiner}
            onPress={() => detailsHandler(product.id)}>
            <View style={styles.imageConatiner}>
              <Image
                source={{uri: product?.image}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.dataConatiner}>
              <Text style={styles.itemTitle}>
                {' '}
                {product?.title?.length > 10
                  ? `${product?.title.substring(0, 25)}...`
                  : product?.title}
              </Text>
              <Text style={styles.itemPrice}>
                *${product?.price} = ${(product?.price).toFixed(2)}
              </Text>
              <Text style={styles.itemTitle}>Qty:1</Text>
              <View style={styles.buttons}>
                <Button onPress={() => increaseQuantity(index)}>
                  <Plus width={18} height={18} />
                </Button>
                <Button onPress={() => removeCartHandler(index)}>Remove</Button>

                {product.quantity > 1 && (
                  <Button onPress={() => decreaseQuantity(index)}>
                    <Minus width={18} height={18} />
                  </Button>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.itemSummary}>
        <View style={styles.totalConatiner}>
          <View style={styles.totalTextContainer}>
            <Text style={styles.totalText}>Total Items: 4 </Text>
            <Text style={styles.totalText}>Total Price: $1200</Text>
          </View>
          <Button onPress={() => {}}>plase order</Button>
        </View>
      </View>
    </>
  );
}

export default ItemsCheckoutScreen;

const styles = StyleSheet.create({
  scrollStyle: {
    paddingBottom: 6,
  },
  conatiner: {
    marginHorizontal: 6,
    marginTop: 10,
  },
  itemConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
    borderWidth: 2,
    borderColor: Colors.primary300,
    borderRadius: 10,
    marginBottom: 6,
    padding: 6,
  },
  textConatiner: {
    padding: 6,
    height: 100,
    borderWidth: 2,
    borderColor: Colors.primary300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.primary300,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  imageConatiner: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary100,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemTitle: {
    fontSize: 16,
    color: Colors.primary300,
    fontWeight: 'bold',
  },
  dataConatiner: {
    width: '70%',
    padding: 4,
  },
  itemPrice: {
    fontSize: 20,
    color: Colors.primary300,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  totalConatiner: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  totalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalText: {
    color: Colors.primary300,
    fontWeight: 'bold',
    fontSize: 20,
  },
  itemSummary: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    backgroundColor: Colors.bgcolor,
    padding: 6,
  },
});
