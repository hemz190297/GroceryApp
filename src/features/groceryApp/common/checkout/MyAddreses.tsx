import React, { useEffect } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import Header from '../Header';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import withKeyboardAvoiding from '../KeyboardAvoidingHoc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { editAddress, removeAddress } from '../../redux/slices/AddressSlice';


const MyAddresses = () => {
    const addresses = useSelector((state) => state.addressState.data || []);
    console.log("adresss12132321#:::::", addresses);

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(addresses);
    }, [isFocused])

    const defaultAddress = async item => {
        await AsyncStorage.setItem('My_ADDRESS', '' + item.city + ',' + item.state + ',' + item.pincode + ',Type:' + item.type)
        navigation.goBack();
    }

    const renderItemAddd = ({ item }) => {

        return (
            <TouchableOpacity style={styles.addressContainer} onPress={() => defaultAddress(item)}>
                <View style={styles.addressCard}>
                    <View>
                        <Text style={styles.addressTypeText}>State: {item?.state || 'N/A'}</Text>
                        <Text style={styles.addressTypeText}>City: {item?.city || 'N/A'}</Text>
                        <Text style={styles.addressTypeText}>Pincode: {item?.pincode || 'N/A'}</Text>
                    </View>
                    <TouchableOpacity style={styles.addressTypeButton}>
                        <Text style={styles.addressTypeText}>{item?.type || 'N/A'}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", gap: 10, marginTop: 40 }}>
                        <TouchableOpacity onPress={() => dispatch(removeAddress(item.id))}>
                            <Image source={require('../images/delete.png')} style={{ height: 24, width: 24 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { dispatch(editAddress(item.id)); navigation.navigate('AddNewAddress', { type: 'edit', data: item }) }}>
                            <Image source={require('../images/edit.png')} style={{ height: 24, width: 24 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                title="My Addresses"
                leftIcon={require('../images/back.png')}
                onClickLeftIcon={() => navigation.goBack()}
            />

            <FlatList
                data={addresses}
                renderItem={renderItemAddd}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No addresses found</Text>}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddNewAddress', { type: 'new' })} >
                <Image source={require('../images/add.png')} style={styles.addIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    listContainer: { padding: 20 },
    emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16 },
    addressContainer: { marginBottom: 20 },
    addressCard: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addressTypeButton: {
        height: 30,
        width: 55,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        right: 10,
        bottom: 50
    },
    addressTypeText: { fontSize: 14, fontWeight: "bold" },
    addButton: {
        position: 'absolute',
        bottom: 80,
        right: 30,
    },
    addIcon: {
        height: 50,
        width: 50,
    },
});

export default withKeyboardAvoiding(MyAddresses);
