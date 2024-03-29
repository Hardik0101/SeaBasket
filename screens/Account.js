import React, {useContext, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import FlatButton from '../components/UI/FlatButton';
import {Colors} from '../constant/styles';
import {IconButton} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import ButtonComponent from '../components/UI/ButtonComponent';
import {AuthContext} from '../store/auth-context';
import {useNavigation} from '@react-navigation/native';
import {setuserData} from '../store/redux/userDataSlice';
import {useDispatch, useSelector} from 'react-redux';

function AccountScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const user = useSelector(state => state.userData.userData);
  const [edit, setEdit] = useState(false);
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    mobile: '',
    address: '',
  });

  const userDataHandler = (key, value) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [key]: value,
    }));
  };

  function userDataSliceHandler(data) {
    dispatch(setuserData(data));
  }

  const handleLogin = () => {
    navigation.navigate('Order');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
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
      <View style={styles.dataContainer}>
        {edit && (
          <View style={styles.dataEdit}>
            <TextInput
              label="User Name"
              mode="outlined"
              style={styles.input}
              value={userData.userName}
              onChangeText={text => userDataHandler('userName', text)}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="account" size={20} />}
            />

            <TextInput
              label="Email"
              mode="outlined"
              style={styles.input}
              value={userData.email}
              onChangeText={text => userDataHandler('email', text)}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="email" size={20} />}
            />

            <TextInput
              label="Mobile Number"
              mode="outlined"
              style={styles.input}
              value={userData.mobile}
              onChangeText={text => userDataHandler('mobile', text)}
              textColor="#000000"
              maxLength={10}
              keyboardType="number-pad"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="phone" size={20} />}
            />
            <TextInput
              label="Address"
              mode="outlined"
              style={styles.input}
              value={userData.address}
              onChangeText={text => userDataHandler('address', text)}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="map-marker" size={20} />}
            />
            <ButtonComponent
              icon={'content-save-outline'}
              onPress={() => {
                setEdit(false);
                userDataSliceHandler(userData);
              }}
              mode={'contained'}
              color={'#FFFFFF'}
              buttonColor={'#2b5c3a'}>
              Save Details
            </ButtonComponent>
          </View>
        )}
        {!edit && (
          <View style={styles.dataEdit}>
            <TextInput
              label="User Name"
              mode="outlined"
              style={styles.input}
              value={user.userName}
              editable={false}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="account" size={20} />}
            />
            <TextInput
              label="Email"
              mode="outlined"
              style={styles.input}
              value={user.email}
              editable={false}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="email" size={20} />}
            />

            <TextInput
              label="Mobile Number"
              mode="outlined"
              style={styles.input}
              value={user.mobile}
              editable={false}
              textColor="#000000"
              keyboardType="number-pad"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="phone" size={20} />}
            />
            <TextInput
              label="Address"
              mode="outlined"
              style={styles.input}
              value={user.address}
              editable={false}
              textColor="#000000"
              outlineStyle={styles.outline}
              left={<TextInput.Icon icon="map-marker" size={20} />}
            />
            <FlatButton>My Orders</FlatButton>
          </View>
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
  container: {
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  dataContainer: {
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
