import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ item, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={onPress}>
            <Image source={{ uri: item.image }} style={styles.imageStyle} />
            <View style={styles.infoView}>
                <Text style={styles.title}>
                    {item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}
                </Text>
                <Text style={styles.description}>
                    {item.description.length > 35 ? item.description.substring(0, 80) + '...' : item.description}
                </Text>
                <View style={styles.footer}>
                    <Text style={styles.price}>$ {item.price}</Text>
                    <View style={styles.rating}>
                        <Text style={styles.ratingText}>{item.rating.rate}</Text>
                        <Image source={require('../common/images/star.png')} style={styles.starIcon} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 3, // For shadow on Android
    },
    imageStyle: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    infoView: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        color: '#666',
        marginVertical: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        color: '#068c18',
        fontSize: 18,
        fontWeight: "thin",
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 18,
        color: '#000',
        marginRight: 4,
        fontWeight: "thin",
    },
    starIcon: {
        width: 10,
        height: 10,
    },
});

export default ProductCard;
