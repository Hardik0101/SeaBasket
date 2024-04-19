import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../constant/styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {clearDetailsState, fetchDetails} from '../store/redux/detailsSlice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {addCart} from '../store/redux/cartSlice';
import {setCheck} from '../store/redux/checkoutSlice';
import Swiper from 'react-native-swiper';
import {HalfStar, OutlineStar, Star} from '../assets/icons';
import ButtonComponent from '../components/UI/ButtonComponent';
import {Card, Icon} from 'react-native-paper';
import {AuthContext} from '../store/auth-context';
import IconButtonComponent from '../components/UI/IconButton';

function DetailScreen() {
  const dispatch = useDispatch();
  const details = useSelector(state => state.details.details);
  const route = useRoute();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [active, setActive] = useState([]);
  const star = [];

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
    return () => {
      dispatch(clearDetailsState());
    };
  }, [dispatch, route.params.id]);

  function toggleDescription() {
    setShowFullDescription(!showFullDescription);
  }

  function addToCart() {
    dispatch(addCart(details));
    ToastAndroid.show('Item added to cart', ToastAndroid.SHORT);
  }

  function checkoutItems() {
    dispatch(setCheck(details));

    if (!authCtx.isAuthenticated) {
      Alert.alert('Login', 'Are you sure you want to login?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Login',
          onPress: () => navigation.navigate('Order'),
        },
      ]);
    } else {
      navigation.navigate('Order');
    }
  }

  const description =
    details && typeof details.description === 'string'
      ? details?.description
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

  const size = ['S', 'M', 'L', 'XL', 'XXL'];

  function sizeHandler(index) {
    setActive(index);
  }

  for (let i = 1; i <= details?.rating?.rate; i++) {
    star.push(i);
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <>
          <View style={styles.container}>
            <Swiper
              style={styles.wrapper}
              autoplay={true}
              autoplayTimeout={4}
              activeDotColor="green"
              height={300}>
              <View style={styles.slide}>
                <Image
                  source={{uri: details?.image}}
                  style={styles.itemImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={{uri: details?.image}}
                  style={styles.itemImage}
                />
              </View>
              <View style={styles.slide}>
                <Image
                  source={{uri: details?.image}}
                  style={styles.itemImage}
                />
              </View>
            </Swiper>
            <Card style={{marginTop: 10}}>
              <Card.Content style={styles.itemConatiner}>
                <Text style={styles.itemTitle}>{details?.title}</Text>
                <View style={styles.priceAndrate}>
                  <Text style={styles.itemPrice}>
                    ₹{(details?.price * 87.37).toFixed(0)}
                  </Text>

                  <Text style={styles.itemPrice}>
                    {star.map(index => (
                      <View key={index}>
                        <Star width={14} height={14} fill={'#daa520'} />
                      </View>
                    ))}
                    {details?.rating?.rate % 1 !== 0 && (
                      <HalfStar width={14} height={14} fill={'#daa520'} />
                    )}{' '}
                    <Text style={{fontSize: 20}}>{details?.rating?.rate}</Text>
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

                {(details.category === "men's clothing" ||
                  details.category === "women's clothing") && (
                  <>
                    <View>
                      <Text style={styles.itemTitle}>Colors:</Text>
                      <View style={styles.colors}>
                        <IconButtonComponent
                          icon={'checkbox-blank-circle'}
                          iconColor={'#ff0000'}
                          mode={'outlined'}
                        />
                        <IconButtonComponent
                          icon={'checkbox-blank-circle'}
                          iconColor={'#008080'}
                          mode={'outlined'}
                        />

                        <IconButtonComponent
                          icon={'checkbox-blank-circle'}
                          iconColor={'#00bfff'}
                          mode={'outlined'}
                        />

                        <IconButtonComponent
                          icon={'checkbox-blank-circle'}
                          iconColor={'#c71585'}
                          mode={'outlined'}
                        />
                      </View>
                    </View>
                    <View>
                      <Text style={styles.itemTitle}>Size:</Text>
                      <View style={styles.sizeBox}>
                        {size.map((size, index) => (
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => sizeHandler(index)}
                            key={index}
                            style={[
                              styles.sizeContainer,
                              active === index
                                ? styles.selectedSizeContainer
                                : null,
                            ]}>
                            <Text style={styles.sizeText}>{size}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </>
                )}
              </Card.Content>
            </Card>
          </View>
        </>
      </ScrollView>
      <View style={styles.buttons}>
        <ButtonComponent icon={'shopping-outline'} onPress={checkoutItems}>
          {' Buy Now'}
        </ButtonComponent>
        <ButtonComponent icon={'cart-outline'} onPress={addToCart}>
          {' Add to Cart'}
        </ButtonComponent>
      </View>
    </>
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
    marginBottom: 6,
    width: '100%',
  },
  itemConatiner: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
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
    color: Colors.text,
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
    color: 'gray',
    textAlign: 'justify',
    letterSpacing: 1,
    fontFamily: 'AnekDevanagari',
    lineHeight: 24,
  },
  readMore: {
    color: Colors.text,
    fontFamily: 'AnekDevanagari',
  },
  buttons: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
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
  colorConatiner: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginTop: 8,
  },
  colors: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeBox: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeContainer: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: 46,
    height: 46,
  },

  selectedSizeContainer: {
    backgroundColor: 'lightgreen',
  },
  sizeText: {
    fontSize: 20,
    color: 'black',
    padding: 2,
    fontWeight: 'bold',
  },
});
