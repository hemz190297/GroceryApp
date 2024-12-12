import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../../components/Button';

export interface CodeParetScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const CodeParrotScreen: React.FC<CodeParetScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Button title='Screeners' onPress={() => navigation.navigate('ScreenersScreen')} />
      <Button title='Market Screen' onPress={() => navigation.navigate('MarketScreen')} />
    </View>
  );
};
