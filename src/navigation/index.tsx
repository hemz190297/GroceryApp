import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeModulesScreen } from '../features/nativeModules/NativeModulesScreen';
import { SetTimeoutScreen } from '../features/others/SetTimeoutScreen';
import { NestedFlatList } from '../features/reactDevTools/NestedFlatList';
import { ReactDevToolsHomeScreen } from '../features/reactDevTools/ReactDevToolsHome';
import FbWelcomeScreen from '../screens/FbWelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='FbWelcome' component={FbWelcomeScreen} />
          <Stack.Screen name='ReactDevToolsHome' component={ReactDevToolsHomeScreen} />
          <Stack.Screen name='NestedFlatList' component={NestedFlatList} />
          <Stack.Screen name='SetTimeoutScreen' component={SetTimeoutScreen} />
          <Stack.Screen name='NativeModuleScreen' component={NativeModulesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
