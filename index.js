// Main.tsx
import { AppRegistry } from 'react-native';
import React, { useState, useMemo } from 'react';
import { PaperProvider } from 'react-native-paper';
import { App } from './App';
import { name as appName } from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { LightTheme } from './src/features/groceryApp/theme/LightTheme';
import { DarkThemeCustome } from './src/features/groceryApp/theme/DarkTheme';

export default function Main() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const theme = useMemo(() => (isDarkMode ? DarkThemeCustome : LightTheme), [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <PaperProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <App toggleTheme={toggleTheme} />
                </NavigationContainer>
            </GestureHandlerRootView>
        </PaperProvider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
