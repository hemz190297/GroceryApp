import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import TabStyle from '../tabs/TabStyle';
import { RootState } from '../redux/store/Store';
import Header from '../common/Header';
import { addCartProduct, reduceCartProduct, removeCartProduct } from '../redux/slices/AddToCartSlice';

const CartScreen: React.FC = () => {
    const cartData = useSelector((state: RootState) => state.addToCartListState.data);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { cartItemStyle, homeStyle } = TabStyle();

    const renderItem = ({ item, index }) => (
        <View style={cartItemStyle.container}>
            <Image source={{ uri: item.image }} style={homeStyle.imageStyle} />
            <View style={cartItemStyle.infoView}>
                <Text style={cartItemStyle.titleTxt}>
                    {item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title}
                </Text>
                <Text style={cartItemStyle.titleTxt}>
                    {item.title && item.title.length > 25
                        ? `${item.title.substring(0, 25)}...`
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

                            <Image source={require('../common/images/minus.png')} style={homeStyle.iconStyle} />
                        </TouchableOpacity>
                        <Text style={cartItemStyle.qtyText}>{item.qty}</Text>
                        <TouchableOpacity
                            style={cartItemStyle.QtyTouchable}
                            onPress={() => { dispatch(addCartProduct(item)) }}
                        >
                            <Image source={require('../common/images/plus.png')} style={homeStyle.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={cartItemStyle.mainContainer}>
            <Header
                leftIcon={require('../common/images/back.png')}
                title="Cart"
                onClickLeftIcon={() => navigation.goBack()}
            />
            {cartData.length === 0 ? (
                <Text style={cartItemStyle.emptyCartText}>Your cart is empty</Text>
            ) : (
                <FlatList
                    data={cartData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

export default CartScreen;
