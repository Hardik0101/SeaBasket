import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import FlatButton from '../components/UI/FlatButton';
import {Colors} from '../constant/styles';
import Button from '../components/UI/Button';
import InputText from '../components/PaymentMethods/InputText';

function AccountScreen({navigation}) {
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.conatiner}>
      <View style={styles.imageConatiner}>
        <Image
          style={styles.image}
          source={require('../assets/images/profile.png')}
        />
      </View>
      <View style={styles.dataConatiner}>
        <InputText placeholder={'Enter Name'} children={'Name'} />
        <InputText children={'Email'} placeholder={'Enter Email'} />
        <InputText
          children={'Mobile Number'}
          placeholder={'Enter Mobile Number'}
          keyboardType={'number-pad'}
        />
        <InputText children={'Address'} placeholder={'Enter Address'} />
        <FlatButton>My Orders</FlatButton>
        <Button>Logout</Button>
        <FlatButton onPress={handleLogin}>Login</FlatButton>
      </View>
    </View>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  conatiner: {
    marginTop: 10,
  },
  imageConatiner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  dataConatiner: {
    marginTop: 10,
    marginHorizontal: 6,
    padding: 2,
  },
  text: {
    color: Colors.primary300,
    fontSize: 22,
    fontFamily: 'AnekDevanagari',
  },
});
