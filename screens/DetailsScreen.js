import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/UI/Button';
import {Colors} from '../constant/styles';
import {useRoute} from '@react-navigation/native';
import {clearState, fetchDetails} from '../store/detailsSlice';

function DetailScreen() {
  const dispatch = useDispatch();
  const data = useSelector(state => state);
  const route = useRoute();

  useEffect(() => {
    function fetchData() {
      try {
        dispatch(fetchDetails(route.params.id));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();

    return () => {
      dispatch(clearState());
    };
  }, [dispatch, route.params.id]);

  return (
    <ScrollView>
      {data && (
        <View style={styles.container}>
          <View style={styles.dataContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: data.details.details.image}}
                style={styles.itemImage}
              />
            </View>
            <View>
              <Text style={styles.itemPrice}>
                ${data.details.details.price}
              </Text>
              <Text style={styles.itemTitle}>{data.details.details.title}</Text>
              <Text style={styles.itemDescription}>
                {data.details.details.description}
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button>Buy</Button>
            <Button>Add to Cart</Button>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  dataContainer: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  itemImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
    color: Colors.primary300,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: Colors.primary300,
  },
  itemDescription: {
    fontSize: 14,
    color: Colors.primary300,
    textAlign: 'justify',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 10,
  },
});
