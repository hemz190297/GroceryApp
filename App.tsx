import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { RootNavigator } from './src/navigation';

export const App = () => {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
};
