import React from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('screen');

const images = [
  require('../../assets/images/add1.jpg'),
  require('../../assets/images/add2.jpg'),
  require('../../assets/images/add3.jpg'),
  require('../../assets/images/add4.jpg'),
];

const AddCard = () => {
  return (
    <View style={styles.container}>
      <Swiper
        dotStyle={styles.dotStyle}
        style={styles.wrapper}
        activeDotStyle={styles.dotStyle}
        autoplay={true}
        autoplayTimeout={4}
        activeDotColor="green"
        dotColor="white">
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  image: {
    width: width,
    resizeMode: 'stretch',
    height: 180,
  },
  dotStyle: {
    marginBottom: -30,
  },
});

export default AddCard;
