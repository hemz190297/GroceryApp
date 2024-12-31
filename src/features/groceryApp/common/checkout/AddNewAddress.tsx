import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../Header';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../../../components/Button';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../redux/slices/AddressSlice';
import withKeyboardAvoiding from '../KeyboardAvoidingHoc';

const AddNewAddress = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(0);
    const [form, setForm] = useState({ state: '', city: '', pincode: '' });
    const dispatch = useDispatch();

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title="Add New Address" leftIcon={require('../images/back.png')} onClickLeftIcon={() => navigation.goBack()} />
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ marginTop: 20 }}>
                    {['state', 'city', 'pincode'].map((field, index) => (
                        <View key={index} style={{ borderWidth: 1, borderRadius: 10, width: '100%', marginTop: 20 }}>
                            <TextInput
                                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                value={form[field]}
                                onChangeText={(value) => handleChange(field, value)}
                                placeholderTextColor="#979797"
                                style={{ marginLeft: 10 }}
                            />
                        </View>
                    ))}
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {['Home', 'Office'].map((type, index) => (
                        <View
                            key={index}
                            style={{
                                height: 50,
                                width: 150,
                                borderWidth: 0.5,
                                borderColor: '#000',
                                borderRadius: 10,
                                marginTop: 20,
                                padding: 15,
                            }}
                        >
                            <TouchableOpacity onPress={() => setSelected(index)}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <Image
                                                source={require(`../images/radio-${selected === index ? 'select' : 'unselect'}.png`)}
                                                style={{ height: 20, width: 20 }}
                                            /> */}
                                    <Text style={{ marginLeft: 20, fontSize: 16 }}>{type}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <Button
                    title="Save Address"
                    onPress={() =>
                        dispatch(
                            addAddress({
                                state: form.state,
                                city: form.city,
                                pincode: form.pincode,
                                type: selected === 0 ? 'Home' : 'Office',
                            })
                        )
                    }
                />
            </View>
        </View>
    );
};

export default withKeyboardAvoiding(AddNewAddress);
