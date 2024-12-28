import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import tabStyle from '../../groceryApp/tabs/TabStyle';
import Header from '../common/Header';

export type Product = {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: { rate: number };
};

const CartListScreen: React.FC = () => {
    const cartData = useSelector((state: any) => state.addToCartListState?.data || []);
    const { homeStyle } = tabStyle();
    const [cartListProducts, setCartListProducts] = useState<Product[]>([]);
    const navigation = useNavigation();

    useEffect(() => {
        setCartListProducts(cartData);
    }, [cartData]);

    const renderCartItem = ({ item }: { item: Product }) => (
        <TouchableOpacity
            activeOpacity={1}
            style={homeStyle.container}
            onPress={() => navigation.navigate('ProductDetails', { data: item })}
        >
            <Image source={{ uri: item.image }} style={homeStyle.imageStyle} />

            <View style={homeStyle.infoView}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title}
                </Text>

                <Text style={{ fontSize: 12, fontWeight: '300' }}>
                    {item.description.length > 80
                        ? `${item.description.substring(0, 80)}...`
                        : item.description}
                </Text>

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 8 }}>
                    <Text style={{ color: '#068c18', fontSize: 18, fontWeight: 'bold' }}>
                        $ {item.price.toFixed(2)}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 16 }}>{item.rating.rate}</Text>
                        <Image
                            source={require('../common/images/star.png')}
                            style={{ height: 12, width: 12, marginLeft: 4 }}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                leftIcon={require('../common/images/back.png')}
                rightIcon={require('../common/images/cart.png')}
                title="Add To Cart"
                onClickLeftIcon={() => navigation.goBack()}
                onClickRightIcon={() => { }}
                isCart={true}
            />

            <View style={{ flex: 1, marginTop: 20 }}>
                <FlatList
                    data={cartListProducts}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    ListEmptyComponent={
                        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
                            No items in your cart.
                        </Text>
                    }
                />
            </View>
        </View>
    );
};

export default CartListScreen;
