// Settings.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTheme } from 'react-native-paper';

const Setting = ({ toggleTheme }: { toggleTheme: () => void }) => {
    const { colors } = useTheme();
    return (
        <View style={{ backgroundColor: colors.background }}>
            <Text style={{ color: colors.onPrimary }}>Change Theme</Text>
            <Button title="Change Theme" onPress={toggleTheme} />
        </View>
    );
};
export default Setting;
