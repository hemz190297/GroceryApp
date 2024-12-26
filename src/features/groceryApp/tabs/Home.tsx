import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../common/Header'
import tabStyle from './TabStyle'
import { useDispatch } from 'react-redux'
import { addProducts } from '../redux/slices/ProductSlice'

const Home = () => {
    const navigation = useNavigation();
    const [product, setProduct] = useState([]);
    const { homeStyle } = tabStyle();
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, [])

    interface Product {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: {
            rate: number;
            count: number;
        };
        qty?: number; // Optional initially, added later
    }

    const getProducts = async () => {
        try {
            // const response = await fetch('https://fakestoreapi.com/products');
            const response: Product[] = [
                {
                    "id": 1,
                    "title": "Fjallraven - Foldsack No. 1 Backpack",
                    "price": 109.95,
                    "description": "Your perfect pack for everyday use and walks in the forest.",
                    "category": "men's clothing",
                    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    "rating": {
                        "rate": 4.9,
                        "count": 120
                    }
                },
                {
                    "id": 2,
                    "title": "Mens Casual Premium Slim Fit T-Shirts",
                    "price": 22.3,
                    "description": "Slim-fitting style, contrast raglan long sleeve.",
                    "category": "men's clothing",
                    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
                    "rating": {
                        "rate": 4.1,
                        "count": 259
                    }
                },
                {
                    "id": 3,
                    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
                    "price": 695,
                    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon.",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                        "rate": 4.6,
                        "count": 400
                    }
                },
                {
                    "id": 4,
                    "title": "Solid Gold Petite Micropave",
                    "price": 168,
                    "description": "Satisfaction guaranteed, free shipping, and returns.",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                        "rate": 3.9,
                        "count": 70
                    }
                },
                {
                    "id": 5,
                    "title": "White Gold Plated Princess",
                    "price": 9.99,
                    "description": "Classic Created Wedding Engagement Solitaire Diamond Ring.",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                        "rate": 3.0,
                        "count": 400
                    }
                }
            ]

            const data = await response;
            setProduct(data)
            data.map((item) => item.qty = 1)
            dispatch(addProducts(data));
        } catch (error) {
            console.error('Error fetching products::::', error);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <Header leftIcon={require('../common/images/main-menu.png')} rightIcon={require('../common/images/menu.png')}
                title={'Grocery App'} onClickLeftIcon={() => { navigation.openDrawer(); }} onClickRightIcon={() => navigation.navigate('CartListScreen')} />
            <View >
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
        </View>
    )
}
export default Home