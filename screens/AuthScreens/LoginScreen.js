import React from 'react';
import {Text, StyleSheet, View, Image, ScrollView} from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';

function LoginScreen() {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/Login.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.auth}>
            <AuthContent isLogin={true} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderBottomWidth: 2,
  },
  image: {
    width: 300,
    height: 300,
  },
  auth: {
    width: '100%',
    marginTop: -18,
  },
});
