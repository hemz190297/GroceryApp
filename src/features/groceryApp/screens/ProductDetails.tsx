import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Header from '../common/Header';
import { Button } from '../../../components/Button';
import { addWishList } from '../redux/slices/WishListSlice';
import { addToCartList } from '../redux/slices/AddToCartSlice';
import ProductDetailStyle from './ProductDetailsStyle';
import { addProducts } from '../redux/slices/ProductSlice';

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

    const product = route.params?.data;

    if (!product) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Product details not found.</Text>
            </View>
        );
    }

    const handleAddToCart = () => {
        dispatch(addToCartList(product));
    };

    const handleAddToWishList = () => {
        dispatch(addWishList(product));
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
                <View style={productStyle.flexRow}>
                    <Text style={productStyle.priceTxt}>Price: </Text>
                    <Text style={productStyle.price}>${product.price}</Text>
                </View>
            </View>

            <View style={productStyle.addToCartButton}>
                <Button title="Add To Cart" onPress={handleAddToCart} />
            </View>
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
