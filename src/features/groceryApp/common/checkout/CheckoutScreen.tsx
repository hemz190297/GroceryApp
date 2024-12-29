import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../Header'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { reduceCartProduct, removeCartProduct, addCartProduct } from '../../redux/slices/AddToCartSlice'
import TabStyle from '../../tabs/TabStyle'
import { Button } from '../../../../components/Button'

const CheckoutScreen = () => {
    const navigation = useNavigation();
    const cartCheckoutData = useSelector((state) => state.addToCartListState.data);
    const { cartItemStyle, homeStyle } = TabStyle();
    const dispatch = useDispatch();

    let total = 0;
    cartCheckoutData.map((item) => {
        total = total + item.qty * item.price
    })

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
                            onPress={() => { dispatch(addCartProduct(item)) }}
                        >
                            <Image source={require('../images/plus.png')} style={homeStyle.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={cartItemStyle.mainContainer}>
            <Header
                leftIcon={require('../images/back.png')}
                title="Cart"
                onClickLeftIcon={() => navigation.goBack()}
            />
            {cartCheckoutData.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={cartItemStyle.emptyCartText}>Your cart is empty</Text>
                </View>
            ) : (
                <View style={{ marginHorizontal: 16, flex: 1 }}>
                    < View style={{ flex: 0.5, }}>
                        <FlatList
                            data={cartCheckoutData}
                            renderItem={renderCheckoutItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#000" }}>
                        <Text style={{ fontSize: 18, fontWeight: "thin" }}>Total:</Text>
                        <Text style={{ fontSize: 20, fontWeight: "thin", color: "green" }}>${total}</Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: "thin" }}>Select Payment Mode</Text>
                    <View style={{ marginTop: 50 }}>
                        <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
                            <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Credit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
                            <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Debit Card</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
                            <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Upi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row", marginTop: 10 }}>
                            <Image source={require('../images/radio-unselect.png')} style={{ height: 20, width: 20 }} />
                            <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Cash On Delivery</Text>
                        </TouchableOpacity>
                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10 }}>Address</Text>
                            <Text style={{ fontSize: 18, fontWeight: "thin", marginLeft: 10, marginTop: 20 }}>Please Select Address</Text>
                        </View>
                        <View style={{ top: 100 }}>
                            <Button title='Pay & Order' onPress={() => console.log("okokokoko")} />
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default CheckoutScreen