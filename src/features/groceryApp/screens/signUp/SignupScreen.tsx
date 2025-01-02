import { View, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import withKeyboardAvoiding from '../../common/KeyboardAvoidingHoc';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({ name: '', email: '', mobileNo: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

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
            .catch(error => {
                console.error('Error adding user:', error);
                setError('Something went wrong. Please try again.');
            });
    };
    return (
        <ScrollView style={{ marginTop: 100, flex: 1, padding: 16, }}>
            <Text style={{ fontSize: 28, fontWeight: "thin" }}>{'SignUp'}</Text>
            <View style={{ alignItems: "center" }}>
                <TouchableOpacity style={{ backgroundColor: "#ed991a", marginTop: 50, height: 40, width: 250, borderRadius: 20, justifyContent: "center" }} onPress={signUpData}>
                    <Text style={{ fontSize: 18, fontWeight: "thin", textAlign: "center", color: "#fff" }}>{'SignUp'}</Text>
                </TouchableOpacity>
                <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={{ fontSize: 16, fontWeight: "thin", marginTop: 10, borderBottomWidth: 1, borderColor: "#000", color: "#5753e6" }}>{'Login'}</Text>
                </Pressable>

            </View>
            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                <TextInput placeholder='Enter Name' value={form.name} onChangeText={value => handleChange('name', value)} placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
            </View>
            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                <TextInput placeholder='Enter Email' value={form.email} onChangeText={value => handleChange('email', value)} placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
            </View>
            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                <TextInput placeholder='Enter MobileNo' value={form.mobileNo} onChangeText={value => handleChange('mobileNo', value)} placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
            </View>  <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                <TextInput placeholder='Enter Password' value={form.password} onChangeText={value => handleChange('password', value)} placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
            </View>  <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                <TextInput placeholder='Enter Confirm Password' value={form.confirmPassword} onChangeText={value => handleChange('confirmPassword', value)} placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
            </View>

        </ScrollView>
    )
}

export default withKeyboardAvoiding(SignupScreen);