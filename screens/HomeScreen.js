import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HorizontalCard from '../components/DataShow/HorizontalCard';
import {Colors} from '../constant/styles';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <HorizontalCard />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
  },
  dataContainer: {
    marginHorizontal: 4,
    height: 300,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary300,
    backgroundColor: Colors.primary100,
  },
});
