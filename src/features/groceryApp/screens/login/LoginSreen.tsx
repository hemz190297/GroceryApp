import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import withKeyboardAvoiding from '../../common/KeyboardAvoidingHoc';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [form, setForm] = useState({ email: '', password: '' });
    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    const loginData = () => {
        firestore().collection('Users')
            .where('email', '==', form.email)
            .get()
            .then(querySnapshot => {
                console.log("okokoko:::::", querySnapshot.docs[0]._data);
            });
    }
    return (
        <View style={{ marginTop: 200, flex: 1, padding: 16, alignItems: "center" }}>
            <Text style={{ fontSize: 28, fontWeight: "thin" }}>{'Login'}</Text>
            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                <TextInput placeholder='Email' value={form.email} onChangeText={value => handleChange('email', value)} placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
            </View>
            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                <TextInput placeholder='Password' value={form.password} onChangeText={value => handleChange('password', value)} placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
            </View>
            <TouchableOpacity style={{ backgroundColor: "#ed991a", marginTop: 50, height: 40, width: 250, borderRadius: 20, justifyContent: "center" }} onPress={loginData}>
                <Text style={{ fontSize: 18, fontWeight: "thin", textAlign: "center", color: "#fff" }}>Login</Text>
            </TouchableOpacity>
            <Pressable onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={{ fontSize: 16, fontWeight: "thin", marginTop: 10, borderBottomWidth: 1, borderColor: "#000", color: "#5753e6" }}>signUp</Text>
            </Pressable>
        </View>
    )
}

export default withKeyboardAvoiding(LoginScreen);