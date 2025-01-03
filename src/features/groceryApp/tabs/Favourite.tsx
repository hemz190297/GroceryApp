import { View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native'
import ProductCard from '../common/CommonProductCard'

const Favourite = () => {
    const wishData = useSelector((state: any) => state.wishListState.data);
    console.log("wishsataaa:2121:::", wishData);

    const navigation = useNavigation();
    return (
        <View>
            <Header leftIcon={require('../common/images/back.png')} rightIcon={require('../common/images/cart.png')}
                title={'Favorites'} onClickLeftIcon={() => { navigation.goBack() }} onClickRightIcon={() => navigation.navigate('CartScreen')} />
            <View style={{ marginTop: 60 }}>
                <FlatList
                    data={wishData}
                    renderItem={({ item }) => (
                        <ProductCard item={item} onPress={() => navigation.navigate('ProductDetails', { data: item })} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    )
}
export default Favourite;