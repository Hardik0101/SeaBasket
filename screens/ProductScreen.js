import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  getCategory,
  getJeweleryItems,
  getMenClothingItems,
} from '../apiCall/dataApi';
import {Colors} from '../constant/styles';

function ProductScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getCategory();
      //   console.log(products);
      setData(products);
    };

    fetchData();
  }, []);

  async function getMenData() {
    try {
      const data = await getJeweleryItems();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {data.map(item => (
        <>
          <TouchableOpacity onPress={getMenData}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{item}</Text>
            </View>
          </TouchableOpacity>
        </>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: Colors.primary300,
    width: '100%',
  },
});

export default ProductScreen;
