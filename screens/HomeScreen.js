import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HorizontalCard from '../components/DataShow/HorizontalCard';
import {Colors} from '../constant/styles';
import {getCategory} from '../apiCall/dataApi';

function HomeScreen() {
  return (
    <View>
      <View style={styles.container}>
        <HorizontalCard />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    height: 300,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: Colors.primary100,
  },
});
