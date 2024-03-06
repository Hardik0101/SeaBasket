import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {getProduct} from '../apiCall/dataApi';

function HomeScreen() {
  async function products() {
    try {
      const data1 = await getProduct();
      console.log('The data is ', data1);
      return data1;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <Text> Home Screen </Text>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text onPress={products}>The Data is </Text>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
