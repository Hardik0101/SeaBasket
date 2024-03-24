import React, {useContext, useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import FlatButton from '../components/UI/FlatButton';
import {Colors} from '../constant/styles';
import InputText from '../components/PaymentMethods/InputText';
import {IconButton, MD3Colors} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import ButtonComponent from '../components/UI/ButtonComponent';
import {AuthContext} from '../store/auth-context';
import {useNavigation} from '@react-navigation/native';

function AccountScreen() {
  const navigation = useNavigation();
  const [edit, setEdit] = useState(false);
  const authCtx = useContext(AuthContext);

  const handleLogin = () => {
    navigation.navigate('Order');
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
            <View style={styles.dataEdit}>
              <TextInput
                label="User Name"
                mode="outlined"
                style={styles.input}
                textColor="#000000"
                outlineStyle={styles.outline}
                left={<TextInput.Icon icon="account" size={20} />}
              />

              <TextInput
                label="Email"
                mode="outlined"
                style={styles.input}
                textColor="#000000"
                outlineStyle={styles.outline}
                left={<TextInput.Icon icon="email" size={20} />}
              />

              <TextInput
                label="Mobile Number"
                mode="outlined"
                style={styles.input}
                textColor="#000000"
                keyboardType="number-pad"
                outlineStyle={styles.outline}
                left={<TextInput.Icon icon="phone" size={20} />}
              />
              <TextInput
                label="Address"
                mode="outlined"
                style={styles.input}
                textColor="#000000"
                outlineStyle={styles.outline}
                left={<TextInput.Icon icon="map-marker" size={20} />}
              />
              <ButtonComponent
                icon={'content-save-outline'}
                onPress={() => setEdit(false)}
                mode={'contained'}
                color={'#FFFFFF'}
                buttonColor={'#2b5c3a'}>
                Save Details
              </ButtonComponent>
            </View>
          </>
        )}
        {!edit && (
          <>
            <TextInput
              label="User Name"
              mode="outlined"
              style={styles.input}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="account" size={20} />}
            />

            <TextInput
              label="Email"
              mode="outlined"
              style={styles.input}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="email" size={20} />}
            />

            <TextInput
              label="Mobile Number"
              mode="outlined"
              style={styles.input}
              textColor="#000000"
              keyboardType="number-pad"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="phone" size={20} />}
            />
            <TextInput
              label="Address"
              mode="outlined"
              style={styles.input}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="map-marker" size={20} />}
            />
            <FlatButton>My Orders</FlatButton>
          </>
        )}
        {authCtx.isAuthenticated && (
          <ButtonComponent onPress={() => authCtx.logout()}>
            Logout
          </ButtonComponent>
        )}
        {!authCtx.isAuthenticated && (
          <ButtonComponent onPress={handleLogin}>Login</ButtonComponent>
        )}
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
  input: {
    backgroundColor: Colors.bgcolor,
    height: 40,
    marginBottom: 10,
  },
  outline: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 10,
  },
  dataEdit: {
    marginBottom: 10,
  },
});
