import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const renderButton = (title: string, onPress: () => void) => {
    return (
      <Button mode="contained" style={{ marginTop: 16}} onPress={onPress}>
        <Text>{title}</Text>
      </Button>
    );
  };

  return (
    <ScrollView style={{marginBottom: 32}}>
      {renderButton('FB welcome', () => navigation.navigate('FbWelcome'))}
    </ScrollView>
  );
};
