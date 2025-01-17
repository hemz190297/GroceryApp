// RootNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CodeParrotScreen } from '../features/codeParrotAi/CodeParrotScreen';
import { MarketScreen } from '../features/codeParrotAi/MarketScreen';
import { ScreenersScreen } from '../features/codeParrotAi/ScreenersScreen';
import { NativeModulesScreen } from '../features/nativeModules/NativeModulesScreen';
import { SetTimeoutScreen } from '../features/others/SetTimeoutScreen';
import { NestedFlatList } from '../features/reactDevTools/NestedFlatList';
import { ReactDevToolsHomeScreen } from '../features/reactDevTools/ReactDevToolsHome';
import FbWelcomeScreen from '../screens/FbWelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MyDrawer } from '../features/groceryApp/drawerMenu/MyDrawer';
import ProductDetails from '../features/groceryApp/screens/ProductDetails';
import CartListScreen from '../features/groceryApp/screens/CartListScreen';
import CartScreen from '../features/groceryApp/screens/CartScreen';
import LoginScreen from '../features/groceryApp/screens/login/LoginSreen';
import SignupScreen from '../features/groceryApp/screens/signUp/SignupScreen';
import CheckoutScreen from '../features/groceryApp/common/checkout/CheckoutScreen';
import AddNewAddress from '../features/groceryApp/common/checkout/AddNewAddress';
import MyAddreses from '../features/groceryApp/common/checkout/MyAddreses';
import OrderScreen from '../features/groceryApp/screens/OrderScreen';
import OrderSuccessScreen from '../features/groceryApp/screens/orderScuccess/OrderSuccessScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = ({ toggleTheme }: { toggleTheme: () => void }) => {
  return (
    <GestureHandlerRootView>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FbWelcome" component={FbWelcomeScreen} />
        <Stack.Screen name="ReactDevToolsHome" component={ReactDevToolsHomeScreen} />
        <Stack.Screen name="NestedFlatList" component={NestedFlatList} />
        <Stack.Screen name="SetTimeoutScreen" component={SetTimeoutScreen} />
        <Stack.Screen name="NativeModuleScreen" component={NativeModulesScreen} />
        <Stack.Screen name="CodeParrotScreen" component={CodeParrotScreen} />
        <Stack.Screen name="ScreenersScreen" component={ScreenersScreen} />
        <Stack.Screen name="MarketScreen" component={MarketScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
        <Stack.Screen name="CartListScreen" component={CartListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddNewAddress" component={AddNewAddress} options={{ headerShown: false }} />
        <Stack.Screen name="MyAddreses" component={MyAddreses} options={{ headerShown: false }} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyDrawer" options={{ headerShown: false }} children={() => <MyDrawer toggleTheme={toggleTheme} />} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};
