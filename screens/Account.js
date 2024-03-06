import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FlatButton from '../components/UI/FlatButton';

function AccountScreen({navigation}) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View>
      <Text> Account Screen </Text>
      <FlatButton onPress={handleLogin}>Login</FlatButton>
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({});
