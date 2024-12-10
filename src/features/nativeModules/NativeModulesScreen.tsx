import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';

export const NativeModulesScreen: React.FC = () => {
  return (
    <View>
      <Button title='Turbo Module' onPress={() => {}} />
      <Button title='Nitro Module' onPress={() => {}} />
    </View>
  );
};
