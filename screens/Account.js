import React, {useContext, useState} from 'react';
import {StyleSheet, View, Image, Text, ToastAndroid} from 'react-native';
import FlatButton from '../components/UI/FlatButton';
import {Colors} from '../constant/styles';
import {IconButton} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import ButtonComponent from '../components/UI/ButtonComponent';
import {AuthContext} from '../store/auth-context';
import {useNavigation} from '@react-navigation/native';
import {setuserData} from '../store/redux/userDataSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Dialog, Portal, Button} from 'react-native-paper';

function AccountScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData.userData);
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const [userData, setUserData] = useState({
    userName: user.userName || '',
    email: user.email || '',
    mobile: user.mobile || '',
    address: user.address || '',
  });

  const userDataHandler = (key, value) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [key]: value,
    }));
  };

  function clearUserState() {
    setUserData({
      userName: '',
      email: '',
      mobile: '',
      address: '',
    });
  }

  function userDataSliceHandler(data) {
    dispatch(setuserData(data));
    ToastAndroid.show('Details Saved', ToastAndroid.SHORT);
  }

  function myOrderHandler() {
    navigation.navigate('MyOrder');
  }

  const handleLogin = () => navigation.navigate('Order');

  const handleLogout = () => {
    return authCtx.logout(), clearUserState(), hideDialog();
  };

  const hideDialog = () => setVisible(false);
  const dialogHandler = () => setVisible(true);

  return (
    <>
      <Portal>
        <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={styles.dialogText}>Confirm</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogMessage}>
              Are you sure you want to Logout?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={styles.dialogButton} onPress={hideDialog}>
              Cancel
            </Button>
            <Button labelStyle={styles.dialogButton} onPress={handleLogout}>
              Logout
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/images/profile.png')}
          />
          {authCtx.isAuthenticated && (
            <IconButton
              icon="account-edit-outline"
              iconColor={Colors.primary}
              size={24}
              onPress={() => setEdit(true)}
            />
          )}
        </View>
        {authCtx.isAuthenticated && (
          <View style={styles.dataContainer}>
            {edit ? (
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
            ) : (
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
                <FlatButton
                  onPress={myOrderHandler}
                  mode={'outlined'}
                  textColor={'#2b5c3a'}
                  icon={'order-bool-ascending-variant'}>
                  My Orders
                </FlatButton>
              </View>
            )}
          </View>
        )}
        {authCtx.isAuthenticated ? (
          <ButtonComponent icon={'logout'} onPress={dialogHandler}>
            Logout
          </ButtonComponent>
        ) : (
          <ButtonComponent icon={'login'} onPress={handleLogin}>
            Login
          </ButtonComponent>
        )}
      </View>
    </>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 6,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  dataContainer: {
    marginTop: 10,
    padding: 2,
  },
  text: {
    color: Colors.primary300,
    fontSize: 22,
    fontFamily: 'AnekDevanagari',
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
  dialog: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 170,
  },
  dialogText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: Colors.primary300,
  },
  dialogMessage: {
    letterSpacing: 1,
    fontSize: 14,
    color: Colors.primary200,
  },
  dialogButton: {
    letterSpacing: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary300,
  },
});
