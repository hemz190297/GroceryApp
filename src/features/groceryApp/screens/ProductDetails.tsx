import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../common/Header';
import { Button } from '../../../components/Button';
import { addWishList } from '../redux/slices/WishListSlice';
import { addToCartList } from '../redux/slices/AddToCartSlice';
import ProductDetailStyle from './ProductDetailsStyle';
import TabStyle from '../tabs/TabStyle';
import LoginModal from '../common/modal/LoginModal';

const ProductDetails = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, any>, string>>();
    const dispatch = useDispatch();
    const { productStyle } = ProductDetailStyle();
    const { cartItemStyle, homeStyle } = TabStyle();
    const product = route.params?.data;
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const checkUserStatus = async () => {
        try {
            const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
            return status !== null;
        } catch (error) {
            console.error('Error checking user status:', error);
            return false;
        }
    };

    useEffect(() => {
        const checkUserLogin = async () => {
            const isLoggedIn = await checkUserStatus();
            setModalVisible(!isLoggedIn);
        };
        checkUserLogin();
    }, []);

    const handleAddToCart = async () => {
        const isLoggedIn = await checkUserStatus();
        if (isLoggedIn) {
            dispatch(addToCartList({
                ...product,
                qty: quantity,
            }));
        } else {
            setModalVisible(true);
        }
    };

    const handleAddToWishList = async () => {
        const isLoggedIn = await checkUserStatus();
        if (isLoggedIn) {
            dispatch(addWishList(product));
        } else {
            setModalVisible(true);
        }
    };

    const handleGoToCart = () => {
        navigation.navigate('CartScreen');
    };

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product details not found.</Text>
            </View>
        );
    }

    return (
        <View style={productStyle.mainContainer}>
            <Header
                leftIcon={require('../common/images/back.png')}
                rightIcon={require('../common/images/cart.png')}
                isCart={false}
                title="Product Details"
                onClickLeftIcon={() => navigation.goBack()}
                onClickRightIcon={handleGoToCart}
            />
            <View style={productStyle.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={productStyle.productImage}
                    resizeMode="stretch"
                />
                <TouchableOpacity
                    style={productStyle.heartImage}
                    onPress={handleAddToWishList}
                >
                    <Image
                        source={require('../common/images/heart.png')}
                        style={productStyle.heartImageSize}
                    />
                </TouchableOpacity>
            </View>
            <View style={productStyle.detailsContainer}>
                <Text style={productStyle.titleTxt}>{product.title}</Text>
                <Text style={productStyle.descriptionTxt}>{product.description}</Text>
            </View>
            <View style={cartItemStyle.qtyContainerCenter}>
                <View style={productStyle.flexRow}>
                    <Text style={productStyle.priceTxt}>Price:</Text>
                    <Text style={productStyle.price}>${product.price}</Text>
                </View>
                <TouchableOpacity
                    style={cartItemStyle.QtyTouchable}
                    onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                    <Image source={require('../common/images/minus.png')} style={homeStyle.iconStyle} />
                </TouchableOpacity>
                <Text style={cartItemStyle.qtyText}>{quantity}</Text>
                <TouchableOpacity
                    style={cartItemStyle.QtyTouchable}
                    onPress={() => setQuantity(quantity + 1)}
                >
                    <Image source={require('../common/images/plus.png')} style={homeStyle.iconStyle} />
                </TouchableOpacity>
            </View>
            <View style={productStyle.addToCartButton}>
                <Button title="Add To Cart" onPress={handleAddToCart} />
            </View>
            <LoginModal
                modalVisible={modalVisible}
                onClickLogin={() => setModalVisible(false)}
                onClickSignUp={() => setModalVisible(false)}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

export default ProductDetails;

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 16,
        color: '#ff0000',
    },
});
