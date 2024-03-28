import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {persistor, store} from './store/redux/store';
import AuthContextProvider, {AuthContext} from './store/auth-context';
import {Account, Cart, Home, Logo, Product} from './assets/icons';
import HomeScreen from './screens/HomeScreen';
import {Colors} from './constant/styles';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/Account';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/AuthScreens/LoginScreen';
import SignupScreen from './screens/AuthScreens/SignupScreen';
import OnboardingScreen from './screens/AuthScreens/OnBoardingScreen';
import DetailScreen from './screens/DetailsScreen';
import ItemsCheckoutScreen from './screens/ItemsCheckoutScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmScreen from './screens/ConfirmOrderScreen';
import {PersistGate} from 'redux-persist/integration/react';
import OrderDetails from './screens/OrderDetails';
import OrderSummaryScreen from './screens/OrderSummury';
import OTPScreen from './screens/OTPSceen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        contentStyle: {backgroundColor: Colors.bgcolor},
        headerShown: false,
      }}>
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: 'SignUp', headerShown: true}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login', headerShown: true}}
      />
    </Stack.Navigator>
  );
}

function AppData() {
  const cartItemCount = useSelector(state => state.cart.cart.length);
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'AnekDevanagari',
          fontSize: 22,
          alignItems: 'center',
        },
        headerStyle: {
          backgroundColor: 'lightgreen',
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          paddingHorizontal: 10,
          paddingVertical: 6,
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
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <>
              <Text style={styles.text}>{cartItemCount}</Text>
              <Cart
                width={22}
                height={22}
                fill={focused ? Colors.primary : 'gray'}
              />
            </>
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({focused}) => (
            <Account
              width={28}
              height={28}
              fill={focused ? Colors.primary : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainApp() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        contentStyle: {backgroundColor: Colors.bgcolor},
        headerTitleStyle: {fontFamily: 'AnekDevanagari'},
      }}>
      {!authCtx.isGuest && (
        <Stack.Screen
          name="OnBoardingScreen"
          component={OnboardingScreen}
          options={{
            headerShown: false,
            title: 'Steps ',
          }}
        />
      )}
      {authCtx.isGuest && (
        <>
          <Stack.Screen
            name="New"
            component={AppData}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={DetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function ConfrimAuthentication() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        contentStyle: {backgroundColor: Colors.bgcolor},
        headerTitleStyle: {fontFamily: 'AnekDevanagari'},
      }}>
      {!authCtx.isAuthenticated && (
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
      )}
      {authCtx.isAuthenticated && (
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

function OrderApp() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        contentStyle: {backgroundColor: Colors.bgcolor},
        headerTitleStyle: {fontFamily: 'AnekDevanagari'},
      }}>
      {!authCtx.isOtp && (
        <Stack.Screen
          name="ConfrimAuth"
          component={ConfrimAuthentication}
          options={{
            headerShown: false,
          }}
        />
      )}
      {authCtx.isOtp && (
        <>
          <Stack.Screen
            name="CheckoutScreen"
            component={ItemsCheckoutScreen}
            options={{
              title: 'CheckOut',
            }}
          />

          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{
              title: 'Payment',
            }}
          />
          <Stack.Screen
            name="ConfirmScreen"
            component={ConfirmScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function CombineStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'lightgreen'},
        contentStyle: {backgroundColor: Colors.bgcolor},
        headerTitleStyle: {fontFamily: 'AnekDevanagari'},
      }}>
      <Stack.Screen
        name="Main"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Order"
        component={OrderApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrder"
        component={OrderDetails}
        options={{
          title: 'Order Details',
        }}
      />
      <Stack.Screen
        name="OredrDetails"
        component={OrderSummaryScreen}
        options={{
          title: 'Order summary',
        }}
      />
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
        <PersistGate loading={null} persistor={persistor}>
          <AuthContextProvider>
            <StatusBar style="light" />
            <Navigation />
          </AuthContextProvider>
        </PersistGate>
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
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.bgcolor,
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: 'red',
    textAlign: 'center',
    zIndex: 10,
  },
});

export default App;
