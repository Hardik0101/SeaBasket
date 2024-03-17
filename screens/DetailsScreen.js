import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/UI/Button';
import {Colors} from '../constant/styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fetchDetails} from '../store/redux/detailsSlice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {addCart} from '../store/redux/cartSlice';
import {setCheck} from '../store/redux/checkoutSlice';
import Swiper from 'react-native-swiper';

function DetailScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const route = useRoute();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    function fetchData() {
      try {
        dispatch(fetchDetails(route.params.id));
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch, route.params.id]);

  function toggleDescription() {
    setShowFullDescription(!showFullDescription);
  }

  function addToCart() {
    dispatch(addCart(data.details.details));
    ToastAndroid.show('Item added to cart', ToastAndroid.SHORT);
  }

  function checkoutItems() {
    dispatch(setCheck(data.details.details));
    navigation.navigate('CheckoutScreen');
  }

  const description =
    data?.details?.details &&
    typeof data.details.details.description === 'string'
      ? data?.details?.details?.description
      : '';

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingOverlay children="Loading..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error occurred while loading data.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      {data && (
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <Swiper
              style={styles.wrapper}
              autoplay={true}
              autoplayTimeout={4}
              activeDotColor="green"
              height={300}>
              <View style={styles.slide}>
                <Image
                  source={{uri: data?.details?.details?.image}}
                  style={styles.itemImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={{uri: data?.details?.details?.image}}
                  style={styles.itemImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={{uri: data?.details?.details?.image}}
                  style={styles.itemImage}
                />
              </View>
            </Swiper>
            <View style={styles.itemConatiner}>
              <Text style={styles.itemTitle}>
                {data?.details?.details?.title}
              </Text>
              <View style={styles.priceAndrate}>
                <Text style={styles.itemPrice}>
                  ${data?.details?.details?.price}
                </Text>
                <Text style={styles.itemPrice}>
                  Rating:{' '}
                  <Text style={{fontSize: 20}}>
                    {data?.details?.details?.rating?.rate}
                  </Text>
                </Text>
              </View>
              <Text style={styles.itemDescription}>About this Product: </Text>
              <Text style={styles.itemDescription}>
                {showFullDescription
                  ? description
                  : `${description.slice(0, 135)}`}{' '}
                {description.length > 135 && (
                  <>
                    <Text onPress={toggleDescription} style={styles.readMore}>
                      {showFullDescription ? 'Read less' : 'Read more...'}
                    </Text>
                  </>
                )}
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button onPress={checkoutItems}>Buy Now</Button>
            <Button onPress={addToCart}>Add to Cart</Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  dataContainer: {
    alignItems: 'center',
    marginBottom: 6,
    width: '100%',
  },
  itemConatiner: {
    width: '100%',
    marginHorizontal: 6,
    marginTop: 10,
  },
  imageContainer: {
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  itemPrice: {
    fontFamily: 'AnekDevanagari',
    fontSize: 24,
    marginBottom: 6,
    color: Colors.primary300,
  },
  itemTitle: {
    fontSize: 24,
    lineHeight: 32,
    color: Colors.primary300,
    fontFamily: 'AnekDevanagari-Bold',
    letterSpacing: 1,
    paddingTop: 10,
  },
  itemDescription: {
    marginTop: 2,
    fontSize: 18,
    color: Colors.primary200,
    textAlign: 'justify',
    letterSpacing: 1,
    fontFamily: 'AnekDevanagari',
    lineHeight: 24,
  },
  readMore: {
    color: Colors.primary300,
    fontFamily: 'AnekDevanagari',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceAndrate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    color: Colors.primary,
  },
});
