import React from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';
import AuthContent from '../../components/Auth/AuthContent';
import {Cart, Logo} from '../../assets/icons';
import {Colors} from '../../constant/styles';

function SignupScreen() {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to SeaBasket</Text>
          <Logo width={28} height={28} fill={Colors.primary300} />
        </View>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/SignUp.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.auth}>
            <AuthContent isLogin={false} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    marginBottom: -10,
    flexDirection: 'row',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 6,
  },
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
    marginTop: -10,
  },
});
