import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const OrderSuccessScreen = () => {
    const orderData = useSelector((state) => state.orderState.data[0]);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../common/images/success.png')}
                style={styles.successImage}
            />
            <Text style={styles.successText}>Order Success!</Text>

            <FlatList
                data={orderData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                        />
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.productPrice}>${item.price}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    successImage: {
        height: 64,
        width: 64,
        marginBottom: 16,
    },
    successText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2e7d32',
    },
    listContainer: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        elevation: 2,
    },
    productImage: {
        height: 40,
        width: 40,
        marginRight: 16,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        color: '#333',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
    },
});

export default OrderSuccessScreen;
