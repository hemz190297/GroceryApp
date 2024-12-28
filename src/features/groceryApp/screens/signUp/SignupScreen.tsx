import { View, Text, TextInput, TouchableOpacity, Pressable, ScrollView, TouchableNativeFeedback, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({ name: '', email: '', mobileNo: '', password: '', confirmPassword: '' });
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const signUpData = () => {
        firestore()
            .collection('Users')
            .add({
                name: form.name,
                email: form.email,
                mobileNo: form.mobileNo,
                password: form.password,
            })
            .then(() => {
                console.log('User added!');
                navigation.navigate('LoginScreen')
            });
    }
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{ marginTop: 100, flex: 1, padding: 16, }}>
                    <Text style={{ fontSize: 28, fontWeight: "thin" }}>SignUp</Text>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity style={{ backgroundColor: "#ed991a", marginTop: 50, height: 40, width: 250, borderRadius: 20, justifyContent: "center" }} onPress={signUpData}>
                            <Text style={{ fontSize: 18, fontWeight: "thin", textAlign: "center", color: "#fff" }}>SignUp</Text>
                        </TouchableOpacity>
                        <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={{ fontSize: 16, fontWeight: "thin", marginTop: 10, borderBottomWidth: 1, borderColor: "#000", color: "#5753e6" }}>Login</Text>
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default SignupScreen;