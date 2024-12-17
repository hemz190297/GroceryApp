import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Button } from '../components/Button';

export interface HomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);
  return (
    <ScrollView ref={scrollViewRef} style={{ marginBottom: 32 }}>
      <Button title='FB welcome' onPress={() => navigation.navigate('FbWelcome')} />
      <Button title='React dev tools' onPress={() => navigation.navigate('ReactDevToolsHome')} />
      <Button title='CodeParrot Ai' onPress={() => navigation.navigate('CodeParrotScreen')} />
      <Button title='Native module' onPress={() => navigation.navigate('NativeModuleScreen')} />
    </ScrollView>
  );
};
