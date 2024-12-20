// MyDrawer.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from './MainScreen';
import Setting from './Settings';

const Drawer = createDrawerNavigator();

export const MyDrawer = ({ toggleTheme }: { toggleTheme: () => void }) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Setting" children={() => <Setting toggleTheme={toggleTheme} />} />
        </Drawer.Navigator>
    );
};
