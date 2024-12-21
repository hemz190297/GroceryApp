import { View, Text, Image } from 'react-native'
import React from 'react'
import Header from '../common/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button } from '../../../components/Button'

const ProductDetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return (<>
        <View style={{ marginTop: 20 }}>
            <Header leftIcon={require('../common/images/back.png')} rightIcon={require('../common/images/cart.png')}
                title={'Product Details'} onClickLeftIcon={() => { navigation.goBack(); }} />


        </View>
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
            <Image source={{ uri: route.params.data.image }} style={{ height: 300, width: 300 }} resizeMode="stretch" />
            <View style={{ paddingHorizontal: 16 }}>
                <Text style={{ fontSize: 20, fontStyle: "italic" }}>{route.params.data.title}</Text>
                <Text style={{ fontSize: 14, fontStyle: "italic", fontFamily: "sans-serif", marginTop: 10 }}>{route.params.data.description}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, fontFamily: "sans-serif", marginTop: 10 }}>Price: </Text>
                    <Text style={{ fontSize: 20, fontFamily: "sans-serif", marginTop: 10, color: "green" }}>${route.params.data.price}</Text>
                </View>
            </View>
            <Button title='Add To Cart' onPress={() => navigation.navigate('')} />
        </View>
    </>)
}

export default ProductDetails