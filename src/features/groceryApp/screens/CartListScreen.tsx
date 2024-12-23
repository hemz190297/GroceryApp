import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import tabStyle from '../../groceryApp/tabs/TabStyle'
import Header from '../common/Header';

const CartListScreen = () => {
    const wishData = useSelector((state: any) => state.addToCartListState)
    const { homeStyle } = tabStyle();
    const [cartLiastProduct, setCartLiastProduct] = useState(wishData.data);
    const navigation = useNavigation();
    return (
        <View>
            <Header leftIcon={require('../common/images/back.png')} rightIcon={require('../common/images/cart.png')}
                title={'Add To Cart'} onClickLeftIcon={() => { navigation.goBack(); }} />
            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={cartLiastProduct}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={homeStyle.container}
                            onPress={() => navigation.navigate('ProductDetails', { data: item })}
                        >
                            <Image source={{ uri: item.image }} style={homeStyle.imageStyle} />
                            <View style={homeStyle.infoView}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    {item.title.length > 25
                                        ? `${item.title.substring(0, 25)}...`
                                        : item.title}
                                </Text>
                                <View>
                                    <Text style={{ fontSize: 12, fontWeight: 'light' }}>
                                        {item.description.length > 35
                                            ? `${item.description.substring(0, 80)}...`
                                            : item.description}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'space-between',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <Text style={{ color: '#068c18', fontSize: 18, fontWeight: 'thin' }}>
                                        $ {item.price}
                                    </Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#000', fontSize: 18, fontWeight: 'thin' }}>
                                            {item.rating.rate}
                                        </Text>
                                        <Image
                                            source={require('../common/images/star.png')}
                                            style={{ height: 10, width: 10 }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    )
}

export default CartListScreen