import React from 'react';
import { RootNavigator } from './src/navigation';
import { store } from './src/features/groceryApp/redux/store/Store';
import { Provider } from 'react-redux';

export const App = ({ toggleTheme }: { toggleTheme: () => void }) => {
  return (
    <Provider store={store}>
      <RootNavigator toggleTheme={toggleTheme} />
    </Provider>
  );
};
