import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import {Account, Cart, Home, Product} from './assets/icons';
import {Colors} from './constant/styles';
import AccountScreen from './screens/Account';
import ProductScreen from './screens/ProductScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="OnBoardingScreen"
        component={OnboardingScreen1}
        options={{
          title: 'Steps ',
        }}
      /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AppData() {
  return (
    <NavigationContainer>
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
          // header,
        }}
        sceneContainerStyle={{backgroundColor: '#e3dfed'}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Home width={28} fill={focused ? Colors.primary : 'black'} />
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
                fill={focused ? Colors.primary : 'black'}
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
                fill={focused ? Colors.primary : 'black'}
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
              <Account width={28} fill={focused ? Colors.primary : 'black'} />
            ),
            // tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <AppData />   */} {/* After Login is done add Logic and Use */}
    </NavigationContainer>
  );
}

function App() {
  return (
    <>
      <StatusBar style="light" />
      <Navigation />
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
