import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';


const LoginModal = ({ modalVisible, onClickLogin, onClickSignUp, onClose }) => {
    const navigation = useNavigation();
    return (
        <Modal style={{ backgroundColor: "#9797971a", flex: 1, justifyContent: "center", alignItems: "center" }} visible={modalVisible}>
            <View style={style.modalView}>
                <TouchableOpacity style={{ justifyContent: "center", alignSelf: "flex-end" }} onPress={() => onClose()}>
                    <Image source={require('../images/close.png')} style={{ height: 14, width: 14 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#4298f5", height: 40, width: 250, borderRadius: 20, justifyContent: "center" }} onPress={() => onClickLogin(navigation.navigate('LoginScreen'))}>
                    <Text style={{ fontSize: 18, fontWeight: "thin", textAlign: "center" }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#e5ed53", height: 40, width: 250, borderRadius: 20, justifyContent: "center" }} onPress={() => onClickSignUp(navigation.navigate('SignupScreen'))}>
                    <Text style={{ fontSize: 18, fontWeight: "thin", textAlign: "center" }}>{'SignUp'}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
const style = StyleSheet.create({
    modalView: {
        backgroundColor: "#fff",
        borderRadius: 20,
        height: 150,
        width: 300,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10
    }
})
export default LoginModal;