import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import debounce from 'lodash/debounce';

export const SetTimeoutScreen = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [type, setType] = useState('');
  let timeoutId: NodeJS.Timeout;

  const onTextChangeTimeOut = (newText: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      console.log('timeout', newText);
      setDisplayText(newText);
    }, 2000);
    setText(newText);
    setType('timeout');
  };

  const onTextChangeLodash = (newText: string) => {
    debounce(
      () => {
        console.log('lodash', newText);
        setDisplayText(newText);
      },
      2000,
      { leading: false, trailing: true },
    )();
    setText(newText);
    setType('lodash');
  };

  const clearText = () => {
    setText('');
    setDisplayText('');
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={text} onChangeText={onTextChangeLodash} placeholder='Type here...' />
      <Button title='Clear Text' onPress={clearText} />
      <Text style={styles.displayText}>{`${type}: ${displayText}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  displayText: {
    marginTop: 20,
    fontSize: 18,
  },
});
