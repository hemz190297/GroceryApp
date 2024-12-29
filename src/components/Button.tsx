import React from 'react';
import { Text } from 'react-native';
import { Button as RNButton } from 'react-native-paper';

export const Button = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <RNButton mode='contained' style={{ marginTop: 16 }} onPress={onPress}>
      <Text style={{ color: "#fff" }}>{title}</Text>
    </RNButton>
  );
};
