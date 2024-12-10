import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import debounce from 'lodash/debounce';

export const SetTimeoutScreen = () => {
  const [text, setText] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [type, setType] = useState('');
  const timeoutId = useRef<NodeJS.Timeout>();

  const onTextChangeTimeOut = (newText: string) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      console.log('timeout', newText);
      setDisplayText(newText);
    }, 2000);
    setText(newText);
    setType('timeout');
  };

  const handleDebouncedTextChange = (newText: string) => {
    console.log('lodash', newText);
    setDisplayText(newText);
  };

  const debouncedOnTextChange = useCallback(
    debounce(handleDebouncedTextChange, 2000, {
      leading: false,
      maxWait: 500,
      trailing: true,
    }),
    [],
  );

  const onTextChangeLodash = (newText: string) => {
    debouncedOnTextChange.cancel();
    debouncedOnTextChange(newText);
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
