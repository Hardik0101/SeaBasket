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
import {Colors} from '../constant/styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {clearState, fetchDetails} from '../store/redux/detailsSlice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import {addCart} from '../store/redux/cartSlice';
import {setCheck} from '../store/redux/checkoutSlice';
import Swiper from 'react-native-swiper';
import {Star} from '../assets/icons';
import ButtonComponent from '../components/UI/ButtonComponent';
import {Card, Icon} from 'react-native-paper';

function DetailScreen() {
  const dispatch = useDispatch();
  const details = useSelector(state => state.details.details);
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
    return () => {
      dispatch(clearState());
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
    navigation.navigate('Order');
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

  return (
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
              <Image source={{uri: details?.image}} style={styles.itemImage} />
            </View>
            <View style={styles.slide}>
              <Image source={{uri: details?.image}} style={styles.itemImage} />
            </View>
            <View style={styles.slide}>
              <Image source={{uri: details?.image}} style={styles.itemImage} />
            </View>
          </Swiper>
          <Card>
            <Card.Content style={styles.itemConatiner}>
              <Text style={styles.itemTitle}>{details?.title}</Text>
              <View style={styles.priceAndrate}>
                <Text style={styles.itemPrice}>
                  ₹{(details?.price * 87.37).toFixed(0)}
                </Text>
                <Text style={styles.itemPrice}>
                  <Star width={14} height={14} fill={'#daa520'} />{' '}
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
              <View style={styles.buttons}>
                <ButtonComponent onPress={checkoutItems}>
                  {' Buy Now'}
                </ButtonComponent>
                <ButtonComponent onPress={addToCart}>
                  {' Add to Cart'}
                </ButtonComponent>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.colorConatiner}>
            <Card.Content>
              <View style={styles.colors}>
                <Text style={styles.itemTitle}>Colors </Text>
                <Icon
                  source={'checkbox-blank-circle'}
                  size={40}
                  color="#ff0000"
                />
                <Icon
                  source={'checkbox-blank-circle'}
                  size={40}
                  color="#008080"
                />
                <Icon
                  source={'checkbox-blank-circle'}
                  size={40}
                  color="#00bfff"
                />
                <Icon
                  source={'checkbox-blank-circle'}
                  size={40}
                  color="#c71585"
                />
              </View>
            </Card.Content>
          </Card>
        </View>
      </>
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
    marginBottom: 6,
    width: '100%',
  },
  itemConatiner: {
    borderRadius: 10,
    backgroundColor: 'lightgrey',
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
  colorConatiner: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    marginTop: 8,
  },
  colors: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
