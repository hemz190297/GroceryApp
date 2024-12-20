import React from 'react';
import { RootNavigator } from './src/navigation';

export const App = ({ toggleTheme }: { toggleTheme: () => void }) => {
  return <RootNavigator toggleTheme={toggleTheme} />;
};
