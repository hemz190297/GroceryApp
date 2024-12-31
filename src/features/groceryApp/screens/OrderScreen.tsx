import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import ProductCard from '../common/CommonProductCard'

const OrderScreen = () => {
    const ordersData = useSelector((state: any) => state.orderState.data)
    const navigation = useNavigation();
    return (
        <View>
            <Header leftIcon={require('../common/images/back.png')}
                title={'Orders'} onClickLeftIcon={() => { navigation.goBack() }} />
            <View style={{ marginTop: 60 }}>
                <FlatList
                    data={ordersData}
                    renderItem={({ item }) => (
                        <ProductCard item={item} onPress={() => navigation.navigate('ProductDetails', { data: item })} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    )
}

export default OrderScreen