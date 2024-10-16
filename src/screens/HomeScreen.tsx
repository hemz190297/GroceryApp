import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

export const HomeScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{flex: 1, padding: 16}}>
        <TouchableOpacity
          // mode="contained"
          style={{backgroundColor: 'red', padding: 24}}
          onPress={() => {
            console.log('on pressed mouli');
            navigation.navigate('FbWelcome');
          }}>
          <Text>FB welcome</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
