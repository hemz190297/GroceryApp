import { View, Text, TextInput, Image, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Header from '../Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button } from '../../../../components/Button'
import { useDispatch } from 'react-redux'
import { addAddress, editAddress } from '../../redux/slices/AddressSlice'
import uuid from 'react-native-uuid';


const AddNewAddress = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [selected, setSelected] = useState(
        route?.params?.type === 'edit'
            ? (route?.params?.data?.type === 'Home' ? 0 : 1)
            : 0
    );

    const [form, setForm] = useState({
        state: route?.params?.type === 'edit' ? route?.params?.data?.state : '',
        city: route?.params?.type === 'edit' ? route?.params?.data?.city : '',
        pincode: route?.params?.type === 'edit' ? route?.params?.data?.pincode : '',
        type: route?.params?.type === 'edit'
            ? (route?.params?.data?.type === 'Home' ? 1 : 2)
            : 1,
    });



    const dispatch = useDispatch();
    console.log("route::::::", route);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    }
    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <View style={{ flex: 1 }}>
                    <Header title={route?.params?.type == 'edit' ? 'Edit Address' : 'Add New Address'} leftIcon={require('../images/back.png')} onClickLeftIcon={() => navigation.goBack()} />
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20, }}>
                                <TextInput placeholder='Enter State' value={form.state} onChangeText={value => handleChange('state', value)}
                                    placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
                            </View>

                            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                                <TextInput placeholder='Enter City' value={form.city} onChangeText={value => handleChange('city', value)}
                                    placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
                            </View>

                            <View style={{ borderWidth: 1, borderRadius: 10, width: "100%", marginTop: 20 }}>
                                <TextInput placeholder='Enter Pincode' value={form.pincode} onChangeText={value => handleChange('pincode', value)}
                                    placeholderTextColor={'#979797'} style={{ marginLeft: 10 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={{ height: 50, width: 150, borderWidth: 0.5, borderColor: "#000", borderRadius: 10, marginTop: 20, padding: 15 }}>
                                <TouchableOpacity onPress={() => setSelected(0)} >
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        {selected == 0 ?
                                            <Image source={require('../images/radio-select.png')} style={{ height: 20, width: 20 }} />
                                            : <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                                        }
                                        <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "thin" }}>Home</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                            <View style={{ height: 50, width: 150, borderWidth: 0.5, borderColor: "#000", borderRadius: 10, marginTop: 20, padding: 15 }}>
                                <TouchableOpacity onPress={() => setSelected(1)} >
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        {selected == 1 ?
                                            <Image source={require('../images/radio-select.png')} style={{ height: 20, width: 20 }} />
                                            : <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                                        }
                                        <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "thin" }}>Office</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button title='Save Address' onPress={() => {

                            if (route?.params?.type === 'edit') {
                                dispatch(editAddress({
                                    state: form.state,
                                    city: form.city,
                                    pincode: form.pincode,
                                    type: selected === 0 ? 'Home' : 'Office',
                                    id: route?.params?.data?.id
                                }));
                                navigation.goBack();
                            } else {
                                dispatch(addAddress({
                                    state: form.state,
                                    city: form.city,
                                    pincode: form.pincode,
                                    type: selected == 0 ? 'Home' : 'Office',
                                    id: uuid.v4()
                                }))
                                navigation.goBack();
                            }
                        }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default AddNewAddress;