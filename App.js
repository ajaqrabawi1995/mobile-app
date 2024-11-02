// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen'; // Adjust the path as necessary
import PackageDetailsScreen from './components/PackageDetailsScreen'; // Adjust the path as necessary
import CartScreen from './components/CartScreen'; // Import CartScreen
import  {CartProvider} from './components/CartContext'; // Import CartProvider
import OrderFormScreen from './components/OrderFormScreen'; // Import OrderFormScreen
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="PackageDetails" component={PackageDetailsScreen} />
          <Stack.Screen name="Cart" component={CartScreen} /> 
          <Stack.Screen name="OrderForm" component={OrderFormScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
