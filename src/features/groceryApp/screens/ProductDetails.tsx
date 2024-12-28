import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Header from '../common/Header';
import { Button } from '../../../components/Button';
import { addWishList } from '../redux/slices/WishListSlice';
import ProductDetailStyle from './ProductDetailsStyle';
import TabStyle from '../tabs/TabStyle';
import { addToCartList } from '../redux/slices/AddToCartSlice';
import { addProducts } from '../redux/slices/ProductSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginModal from '../common/modal/LoginModal';

type ProductDetailsProps = {
    params: {
        data: {
            id: number;
            title: string;
            description: string;
            price: number;
            image: string;
        };
    };
};

const ProductDetails: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<Record<string, ProductDetailsProps>, string>>();
    const dispatch = useDispatch();
    const { productStyle } = ProductDetailStyle();
    const { cartItemStyle, homeStyle } = TabStyle();
    const product = route.params?.data;
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(true);

    const checkUserStatus = async () => {
        let isUserLoggedIn = false;
        const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
        if (status == null) {
            isUserLoggedIn = false;
        } else {
            isUserLoggedIn = true;
        }
        return isUserLoggedIn;
    }

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product details not found.</Text>
            </View>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCartList(product));
        if (checkUserStatus() === true) {
            dispatch(addToCartList({
                category: product.category,
                id: product.id,
                image: product.image,
                price: product.price,
                rating: product.rating,
                title: product.title,
                qty: quantity
            }));
        } else {
            setModalVisible(true);
        }
    };

    const handleAddToWishList = () => {
        if (checkUserStatus === true) {
            dispatch(addWishList(product));
        } else {
            setModalVisible(true);
        }
    };

    const handleGoToCart = () => {
        dispatch(addProducts(product));
        navigation.navigate('CartScreen');
    };



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
                    <Text style={productStyle.priceTxt}>Price: </Text>
                    <Text style={productStyle.price}>${product.price}</Text>
                </View>
                <TouchableOpacity
                    style={cartItemStyle.QtyTouchable}
                    onPress={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}>
                    <Image source={require('../common/images/minus.png')} style={homeStyle.iconStyle} />
                </TouchableOpacity>
                <Text style={cartItemStyle.qtyText}>{quantity}</Text>
                <TouchableOpacity
                    style={cartItemStyle.QtyTouchable}
                    onPress={() => {
                        setQuantity(quantity + 1)
                    }}>
                    <Image source={require('../common/images/plus.png')} style={homeStyle.iconStyle} />
                </TouchableOpacity>
            </View>

            <View style={productStyle.addToCartButton}>
                <Button title="Add To Cart" onPress={handleAddToCart} />
            </View>
            <LoginModal modalVisible={modalVisible} onClickLogin={() => setModalVisible(false)} onClickSignUp={() => setModalVisible(false)} onClose={() => setModalVisible(false)} />
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
