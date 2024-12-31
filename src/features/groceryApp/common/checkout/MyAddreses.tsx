import { View, Image, TouchableOpacity, Text, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Header from '../Header'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import withKeyboardAvoiding from '../KeyboardAvoidingHoc'

const MyAddreses = () => {
    const address = useSelector((state) => state.addressState.data[0])
    const navigation = useNavigation();
    return (

        <View style={{ flex: 1 }}>
            <Header title='My Addreses' leftIcon={require('../images/back.png')} onClickLeftIcon={() => navigation.goBack()} />
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <View >
                    <View style={{ borderWidth: 1, borderColor: "#000", height: 100, borderRadius: 10, padding: 15, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            {/* <Text>State:{address.state}</Text>
                                    <Text>City:{address.city}</Text>
                                    <Text>Pincode:{address.pincode}</Text> */}
                        </View>
                        <View style={{ height: 40, width: 60, borderRadius: 10, borderWidth: 1, backgroundColor: "red", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ textAlign: "center" }}>Home</Text>
                        </View>
                    </View>

                </View>
            </View>
            <TouchableOpacity style={{ position: "absolute", bottom: 80, right: 30 }} onPress={() => navigation.navigate('AddNewAddress')}>
                <Image source={require('../images/add.png')} style={{ height: 50, width: 50 }} />
            </TouchableOpacity>
        </View>
    )
}
export default withKeyboardAvoiding(MyAddreses);