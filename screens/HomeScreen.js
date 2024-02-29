import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Svg} from 'react-native-svg';
import {Cart} from '../assets/icons';

function HomeScreen() {
  return (
    <View>
      <Text> Home Screen </Text>
      <Image
        source={require('../assets/images/Logo.png')}
        style={styles.image}
      />
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
