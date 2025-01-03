import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import withKeyboardAvoiding from '../../common/KeyboardAvoidingHoc';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({
        name: '',
        email: '',
        mobileNo: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const { name, email, mobileNo, password, confirmPassword } = form;

        if (!name || !email || !mobileNo || !password || !confirmPassword) {
            setError('All fields are required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return false;
        }

        setError('');
        return true;
    };

    const signUpData = () => {
        if (!validateForm()) return;

        firestore()
            .collection('Users')
            .add({ ...form })
            .then(() => {
                console.log('User added!');
                navigation.navigate('LoginScreen');
            })
            .catch((error) => {
                console.error('Error adding user:', error);
                setError('Something went wrong. Please try again.');
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Sign Up</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Name"
                    value={form.name}
                    onChangeText={(value) => handleChange('name', value)}
                    placeholderTextColor="#979797"
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Email"
                    value={form.email}
                    onChangeText={(value) => handleChange('email', value)}
                    placeholderTextColor="#979797"
                    style={styles.input}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Mobile No"
                    value={form.mobileNo}
                    onChangeText={(value) => handleChange('mobileNo', value)}
                    placeholderTextColor="#979797"
                    style={styles.input}
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Password"
                    value={form.password}
                    onChangeText={(value) => handleChange('password', value)}
                    placeholderTextColor="#979797"
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Enter Confirm Password"
                    value={form.confirmPassword}
                    onChangeText={(value) => handleChange('confirmPassword', value)}
                    placeholderTextColor="#979797"
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={signUpData}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.loginText}>Already have an account? Login</Text>
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        textAlign: 'center',
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#ed991a',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        fontSize: 16,
        color: '#5753e6',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default withKeyboardAvoiding(SignupScreen);
