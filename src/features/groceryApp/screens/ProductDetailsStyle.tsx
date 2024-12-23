
import { StyleSheet, Text, View } from "react-native";

export default function ProductDetailStyle() {
    const productStyle = StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: "#fff",
        },
        subContainer: {

        },
        imageContainer: {
            flexDirection: "row",
            flex: 1,
            marginTop: 40,
            justifyContent: "center",
        },
        productImage: {
            height: 300,
            width: 250
        },
        heartImage: {
            marginTop: 50,
            marginLeft: 20,
            backgroundColor: "#979797",
            borderRadius: 30,
            padding: 5,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
        },
        heartImageSize: {
            height: 24,
            width: 24
        },
        titleTxt: {
            fontSize: 20,
            fontStyle: "italic"
        },
        discription: {
            fontSize: 14,
            fontStyle: "italic",
            fontFamily: "sans-serif",
            marginTop: 10
        },
        flexRow: {
            flexDirection: "row"
        },
        priceTxt: {
            fontSize: 20,
            fontFamily: "sans-serif",
            marginTop: 10
        },
        price: {
            fontSize: 20,
            fontFamily: "sans-serif",
            marginTop: 10,
            color: "green"
        },
        addToCartButton: {
            margin: 16,
            marginBottom: 30
        }
    })
    return {
        productStyle,
    }
}