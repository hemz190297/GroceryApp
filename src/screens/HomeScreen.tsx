import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';

export const HomeScreen = ({navigation}) => {
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
