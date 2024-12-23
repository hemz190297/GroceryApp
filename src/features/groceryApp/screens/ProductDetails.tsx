import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button } from '../../../components/Button'
import { useDispatch } from 'react-redux'
import { addWishList } from '../redux/slices/WishListSlice'
import { addToCartList } from '../redux/slices/AddToCartSlice'
import ProductDetailStyle from './ProductDetailsStyle'

const ProductDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const { productStyle } = ProductDetailStyle();

    return (
        <View style={productStyle.mainContainer}>
            <Header leftIcon={require('../common/images/back.png')} rightIcon={require('../common/images/cart.png')}
                title={'Product Details'} onClickLeftIcon={() => { navigation.goBack() }} />

            <View style={productStyle.imageContainer}>
                <Image source={{ uri: route.params.data.image }} style={productStyle.productImage} resizeMode="stretch" />
                <TouchableOpacity style={productStyle.heartImage}
                    onPress={() => { dispatch(addWishList(route.params.data)) }}>
                    <Image source={require('../common/images/heart.png')} style={productStyle.heartImageSize} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 16, flex: 1 }}>
                <Text style={productStyle.titleTxt}>{route.params.data.title}</Text>
                <Text style={productStyle.discription}>{route.params.data.description}</Text>
                <View style={productStyle.flexRow}>
                    <Text style={productStyle.priceTxt}>Price: </Text>
                    <Text style={productStyle.price}>${route.params.data.price}</Text>
                </View>
            </View>

            <View style={productStyle.addToCartButton}>
                <Button title='Add To Cart' onPress={() => { dispatch(addToCartList(route.params.data)) }} />
            </View>
        </View>
    )
}
export default ProductDetails