import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import FlatButton from '../components/UI/FlatButton';
import {Colors} from '../constant/styles';
import InputText from '../components/PaymentMethods/InputText';
import {IconButton, MD3Colors} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import ButtonComponent from '../components/UI/ButtonComponent';
import {AuthContext} from '../store/auth-context';

function AccountScreen({navigation}) {
  const [edit, setEdit] = useState(false);
  const authCtx = useContext(AuthContext);

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
        <IconButton
          icon="account-edit-outline"
          iconColor={Colors.primary}
          size={24}
          onPress={() => setEdit(true)}
        />
      </View>
      <View style={styles.dataConatiner}>
        {edit && (
          <>
            <TextInput
              label="User Name"
              left={<TextInput.Icon icon="account" size={20} />}
            />

            <InputText
              children={'Mobile Number'}
              placeholder={'Enter Mobile Number'}
              keyboardType={'number-pad'}
            />
            <InputText children={'Address'} placeholder={'Enter Address'} />
            <ButtonComponent
              icon={'content-save-outline'}
              onPress={() => setEdit(false)}
              mode={'contained'}
              color={'#FFFFFF'}
              buttonColor={'#2b5c3a'}>
              Save Details
            </ButtonComponent>
          </>
        )}

        <FlatButton>My Orders</FlatButton>
        <ButtonComponent onPress={() => authCtx.logout()}>
          Logout
        </ButtonComponent>
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
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // fontFamily: 'AnekDevanagari',
  },
  input: {},
});
