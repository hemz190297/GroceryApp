import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <Header title='Profile' />
            <View style={{ marginTop: 50, alignItems: "center", justifyContent: "center" }}>
                <Image source={require('../common/images/profile.png')} style={{ height: 100, width: 100 }} />
                <Text style={{ fontSize: 18, fontWeight: "thin" }}>Hemant</Text>
                <Text style={{ fontWeight: "thin" }}>hemantsonkusare@gmail.com</Text>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 50 }}>
                <Pressable style={{ borderBottomWidth: 0.3, borderBlockColor: "#000", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "thin", marginLeft: 20 }}>Edit Profile</Text>
                </Pressable>
                <Pressable style={{ borderBottomWidth: 0.3, borderBlockColor: "#000", marginTop: 20 }} onPress={() => navigation.navigate("OrderScreen")}>
                    <Text style={{ fontSize: 20, fontWeight: "thin", marginLeft: 20 }}>Orders</Text>
                </Pressable>
                <Pressable style={{ borderBottomWidth: 0.3, borderBlockColor: "#000", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "thin", marginLeft: 20 }}>Address</Text>
                </Pressable>
                <Pressable style={{ borderBottomWidth: 0.3, borderBlockColor: "#000", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "thin", marginLeft: 20 }}>Payment Methods</Text>
                </Pressable>
                <Pressable style={{ borderBottomWidth: 0.3, borderBlockColor: "#000", marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "thin", marginLeft: 20 }}>Log out</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default ProfileScreen;