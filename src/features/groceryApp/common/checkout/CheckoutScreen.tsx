import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { reduceCartProduct, removeCartProduct, addCartProduct } from '../../redux/slices/AddToCartSlice'
import TabStyle from '../../tabs/TabStyle'
import { Button } from '../../../../components/Button'
import RazorpayCheckout from 'react-native-razorpay';
import { addOrders } from '../../redux/slices/OrderSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CheckoutScreen = () => {
    const navigation = useNavigation();
    const cartCheckoutData = useSelector((state) => state.addToCartListState.data);
    // console.log("cartCheckoutData:::::", cartCheckoutData);

    const { cartItemStyle, homeStyle } = TabStyle();
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress] = useState('Please Select Address');
    const [city, state, pincode, type] = selectedAddress.split(',').map((item) => item.trim());
    const isFocused = useIsFocused();
    const [selectedButton, setSelectedButton] = useState(0);

    let total = 0;
    cartCheckoutData.map((item) => {
        total = total + item.qty * item.price
    })

    // const orderPlace = (paymentId) => {
    //     const data = {
    //         items: cartCheckoutData,
    //         amount: '$' + total,
    //         // address:selectedAddress,
    //         paymentId: paymentId,
    //         paymentStatus: selectedButton == 3 ? 'Pending' : 'Success'
    //     };
    //     dispatch(addOrders(data));
    //     navigation.navigate('OrderScreen')
    // }

    useEffect(() => {
        getSelectedAddress();
    }, [isFocused]);

    const getSelectedAddress = async () => {
        const address = await AsyncStorage.getItem('My_ADDRESS');
        setSelectedAddress(address || 'Please Select Address');
    };

    const orderScuccessScreen = () => {
        setTimeout(() => {

            navigation.navigate('OrderScreen')
        }, 3000)
        dispatch(addOrders(cartCheckoutData))
        navigation.navigate('OrderSuccessScreen')
    }

    const renderCheckoutItem = ({ item, index }) => (
        <View style={cartItemStyle.container}>
            <Image source={{ uri: item.image }} style={homeStyle.imageStyle} />
            <View style={cartItemStyle.infoView}>
                <Text style={cartItemStyle.titleTxt}>
                    {item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title}
                </Text>
                <Text style={cartItemStyle.titleTxtDes}>
                    {item.description && item.description.length > 25
                        ? `${item.description.substring(0, 25)}...`
                        : item.title || 'No Title Available'}
                </Text>
                <View style={cartItemStyle.subContainer}>
                    <Text style={cartItemStyle.priceTxt}>${item.price}</Text>
                    <View style={cartItemStyle.qtyContainer}>
                        <TouchableOpacity
                            style={cartItemStyle.QtyTouchable}
                            onPress={() => {
                                if (item.qty > 1) {
                                    dispatch(reduceCartProduct({ id: item.id }));
                                } else {
                                    dispatch(removeCartProduct(item.id));
                                }
                            }}>
                            <Image source={require('../images/minus.png')} style={homeStyle.iconStyle} />
                        </TouchableOpacity>

                        <Text style={cartItemStyle.qtyText}>{item.qty}</Text>
                        <TouchableOpacity
                            style={cartItemStyle.QtyTouchable}
                            onPress={() => { dispatch(addCartProduct(item)) }}>
                            <Image source={require('../images/plus.png')} style={homeStyle.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <View style={cartItemStyle.mainContainer}>
                    <Header
                        leftIcon={require('../images/back.png')}
                        title="CheckOut"
                        onClickLeftIcon={() => navigation.goBack()}
                    />
                    {cartCheckoutData.length === 0 ? (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={cartItemStyle.emptyCartText}>Your cart is empty</Text>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={cartCheckoutData}
                                    renderItem={renderCheckoutItem}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                            <View style={{ paddingHorizontal: 16 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#000", }}>
                                    <Text style={{ fontSize: 18, fontWeight: "thin" }}>Total:</Text>
                                    <Text style={{ fontSize: 20, fontWeight: "thin", color: "green" }}>${total}</Text>
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: "thin" }}>Select Payment Mode</Text>
                                <View style={{ marginTop: 10 }}>
                                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }} onPress={() => setSelectedButton(0)}>
                                        {selectedButton == 0 ?
                                            <Image source={require('../images/radio-select.png')} style={{ height: 20, width: 20 }} />
                                            : <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                                        }

                                        <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Credit Card</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }} onPress={() => setSelectedButton(1)}>
                                        {selectedButton == 1 ?
                                            <Image source={require('../images/radio-select.png')} style={{ height: 20, width: 20 }} />
                                            : <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                                        }
                                        <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Debit Card</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }} onPress={() => setSelectedButton(2)}>
                                        {selectedButton == 2 ?
                                            <Image source={require('../images/radio-select.png')} style={{ height: 20, width: 20 }} />
                                            : <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                                        }
                                        <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Upi</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }} onPress={() => setSelectedButton(3)}>
                                        {selectedButton == 3 ?
                                            <Image source={require('../images/radio-select.png')} style={{ height: 20, width: 20 }} />
                                            : <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                                        }
                                        <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Cash On Delivery</Text>
                                    </TouchableOpacity>

                                    <View style={{ marginTop: 40, marginHorizontal: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <Text style={{ fontSize: 18, fontWeight: "thin" }}>Address</Text>
                                            <Pressable onPress={() => navigation.navigate("MyAddreses")} style={{ borderBottomWidth: 1, borderBlockColor: "#318ade" }}>
                                                <Text style={{ fontSize: 18, fontWeight: "thin", color: "#318ade" }}>Edit Address</Text>
                                            </Pressable>
                                        </View>
                                        <View style={{ marginTop: 20 }}>
                                            <Text style={{ fontSize: 18, fontWeight: "thin" }}>{`State: ${state}`}</Text>
                                            <Text style={{ fontSize: 18, fontWeight: "thin" }}>{`City: ${city}`}</Text>
                                            <Text style={{ fontSize: 18, fontWeight: "thin" }}>{`Pincode: ${pincode}`}</Text>
                                            <Text style={{ fontSize: 18, fontWeight: "thin" }}>{`Type: ${type}`}</Text>
                                        </View>


                                    </View>
                                    <View style={{ top: -10 }}>
                                        {/* <Button title='Pay & Order' onPress={() => {
                                            var options = {
                                                description: 'Credits towards consultation',
                                                image: 'https://your-logo-url.com',
                                                currency: 'INR',
                                                key: 'YOUR_API_KEY_ID',
                                                amount: '5000', // Amount in paise (5000 paise = INR 50)
                                                name: 'Your Company Name',
                                                prefill: {
                                                    email: 'user@example.com',
                                                    contact: '9876543210',
                                                    name: 'User Name'
                                                },
                                                theme: { color: '#F37254' }
                                            }
                                            RazorpayCheckout.open(options).then((data) => {
                                                // handle success
                                                // Alert.alert(`Success: ${data.razorpay_payment_id}`);
                                                orderPlace(data.razorpay_payment_id)
                                            }).catch((error) => {
                                                // handle failure
                                                Alert.alert(`Error: ${error.code} | ${error.description}`);
                                            });
                                        }} /> */}
                                        <Button title='Pay & Order' onPress={() => { orderScuccessScreen() }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default CheckoutScreen