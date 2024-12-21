import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';

import tabStyle from './TabStyle';

const Search = () => {
    const products = useSelector((state) => state.productState.data);
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const navigation = useNavigation();
    const { homeStyle } = tabStyle();

    const filteredData = (txt) => {
        const newData = products.filter((item) =>
            item.title.toLowerCase().includes(txt.toLowerCase())
        );
        setFilteredProducts(newData);
    };

    const handleClearSearch = () => {
        setSearch('');
        setFilteredProducts(products);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <Header
                        leftIcon={require('../common/images/back.png')}
                        onClickLeftIcon={() => navigation.goBack()}
                        title="Search Item"
                        rightIcon={0}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius: 20,
                            borderColor: '#979797',
                            marginTop: 30,
                            width: '90%',
                            height: 50,
                            marginHorizontal: 16,
                        }}
                    >
                        <Image
                            source={require('../common/images/search.png')}
                            style={{ height: 20, width: 20, marginLeft: 10 }}
                        />
                        <TextInput
                            placeholder="Search Product"
                            value={search}
                            onChangeText={(txt) => {
                                setSearch(txt);
                                filteredData(txt);
                            }}
                            placeholderTextColor={"#979797"}
                            style={{ flex: 1, paddingLeft: 10, color: "#000" }}
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={handleClearSearch}>
                                <Image
                                    source={require('../common/images/close.png')}
                                    style={{ height: 14, width: 14, marginRight: 10 }}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <FlatList
                            data={filteredProducts}
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Search;
