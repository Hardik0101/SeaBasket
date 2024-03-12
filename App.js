import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import {Account, Cart, Home, Logo, Product} from './assets/icons';
import {Colors} from './constant/styles';
import AccountScreen from './screens/Account';
import ProductScreen from './screens/ProductScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/AuthScreens/LoginScreen';
import SignupScreen from './screens/AuthScreens/SignupScreen';
import OnboardingScreen from './screens/AuthScreens/OnBoardingScreen';
import {Provider} from 'react-redux';
import {store} from './store/store';
import DetailScreen from './screens/DetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        contentStyle: {backgroundColor: Colors.bgcolor},
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnboardingScreen}
        options={{
          title: 'Steps ',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login', headerShown: true}}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: 'SignUp', headerShown: true}}
      />
    </Stack.Navigator>
  );
}

function AppData() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          paddingHorizontal: 10,
        },
        tabBarItemStyle: {
          marginBottom: 10,
        },
      }}
      sceneContainerStyle={{backgroundColor: Colors.bgcolor}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarHideOnKeyboard: true,
          title: 'SeaBasket',
          tabBarIcon: ({focused}) => (
            <Home
              width={28}
              height={28}
              fill={focused ? Colors.primary : 'gray'}
            />
          ),
          headerLeft: () => (
            <View style={{marginLeft: 10, marginRight: -14}}>
              <Logo width={28} height={28} />
            </View>
          ),
          // tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Product
              width={26}
              height={26}
              fill={focused ? Colors.primary : 'gray'}
            />
          ),
          // tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Cart
              width={24}
              height={24}
              fill={focused ? Colors.primary : 'gray'}
            />
          ),
          // tabBarLabel: () => null,
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Account
              width={28}
              height={28}
              fill={focused ? Colors.primary : 'gray'}
            />
          ),
          // tabBarLabel: () => null,
        }}
      />
    </Tab.Navigator>
  );
}

function CombineStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        contentStyle: {backgroundColor: Colors.bgcolor},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Auth"
        component={AuthStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="New"
        component={AppData}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <CombineStack />
    </NavigationContainer>
  );
}

function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <Navigation />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
