import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Checkout = ({ item, total }) => {
    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: "#fff", height: 60, width: "auto", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, alignItems: "center", paddingBottom: 5 }}>
                <View>
                    <Text style={{ fontSize: 14, fontWeight: "thin" }}>{`items :${item}`}</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total: ${total}</Text>
                </View>
                <TouchableOpacity style={{ height: 40, backgroundColor: "orange", borderRadius: 10, borderColor: "#fff", width: 120, justifyContent: "center", alignItems: "center" }}
                    onPress={() => navigation.navigate("CheckoutScreen")}>
                    <Text style={{ fontSize: 14, fontWeight: "thin", color: "#fff", textAlign: "center" }}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Checkout