import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Button, PaperProvider} from 'react-native-paper';
import { RootNavigator } from './src/navigation';


export const App = () => {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
};
