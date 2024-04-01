import React from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';

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
      <ScrollView
        horizontal={true}
        style={styles.scroll}
        snapToAlignment="center"
        snapToInterval={width}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView>
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
});

export default AddCard;
