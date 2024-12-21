import { View, Text, FlatList, Image, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../common/Header'
import tabStyle from './TabStyle'
import { useDispatch } from 'react-redux'
import { addProducts } from '../redux/slices/ProductSlice'
import { json } from '../../../../e2e/jest.config'

const Home = () => {
    const navigation = useNavigation();
    const [product, setProduct] = useState([]);
    const { homeStyle } = tabStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, [])




    const getProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            dispatch(addProducts(data));
        } catch (error) {
            console.error('Error fetching products::::', error);
        }
    };
    return (
        <View style={{}}>
            <Header leftIcon={require('../common/images/main-menu.png')} rightIcon={require('../common/images/menu.png')}
                title={'Grocery App'} onClickLeftIcon={() => { navigation.openDrawer(); }} />
            <FlatList data={product} renderItem={({ item, index }: any) => {
                return (
                    <TouchableOpacity activeOpacity={1} style={homeStyle.container} onPress={() => navigation.navigate('ProductDetails', { data: item })}>
                        <Image source={{ uri: item.image }} style={homeStyle.imageStyle} />
                        <View style={homeStyle.infoView}>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>{item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}</Text>
                            <View>
                                <Text style={{ fontSize: 12, fontWeight: "light" }}>{item.description.length > 35 ? item.description.substring(0, 80) + '...' : item.description}</Text>
                            </View>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ color: "#068c18", fontSize: 18, fontWeight: "thin" }}>$ {item.price}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: "#000", fontSize: 18, fontWeight: "thin" }}>{item.rating.rate}</Text>
                                    <Image source={require('../common/images/star.png')} style={{ height: 10, width: 10 }} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                )
            }
            } />
        </View>
    )
}
export default Home