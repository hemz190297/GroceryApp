import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, TextInput } from 'react-native-paper';

interface Todo {
  id: number;
  text: string;
}

export interface ReactDevToolsHomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}

const TodoListComponent = () => {
  return <Text style={styles.title}>Todo List from component</Text>;
};

export const ReactDevToolsHomeScreen = ({ navigation }: ReactDevToolsHomeScreenProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const addTodo = () => {
    if (inputText.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputText.trim() }]);
      setInputText('');
    }
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //   const RenderTitle = () => {
  //     useEffect(() => {
  //       console.log('RenderTitle useEffect mount');
  //       return () => {
  //         console.log('RenderTitle useEffect un-mount');
  //       };
  //     }, []);
  //     return <Text style={styles.title}>Todo List</Text>;
  //   };

  //   const renderTitle = () => {
  //     useEffect(() => {
  //       console.log('renderTitle useEffect mount');
  //       return () => {
  //         console.log('renderTitle useEffect un-mount');
  //       };
  //     }, []);
  //     return <Text style={styles.title}>Todo List</Text>;
  //   };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NestedFlatList');
          }}
        >
          <Text>Nested Flatlist</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Todo List</Text>
        <TodoListComponent />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder='Enter a new todo'
            placeholderTextColor='#aaa'
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.text}</Text>
              <TouchableOpacity onPress={() => removeTodo(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  todoText: {
    fontSize: 16,
    color: '#343a40',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  removeButtonText: {
    color: 'red',
    fontSize: 16,
  },
});
