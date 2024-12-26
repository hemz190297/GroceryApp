import { StyleSheet } from 'react-native'

export default function TabStyle() {
    const homeStyle = StyleSheet.create({
        container: {
            flexDirection: "row", marginTop: 10, paddingHorizontal: 10, flex: 1
        },
        imageStyle: { height: 100, width: 100 },
        infoView: { margin: 5, width: "70%", },
        quantityButton: { height: 30, width: 30, borderWidth: 1, borderRadius: 5, alignItems: "center", justifyContent: "center" },
        iconStyle: { height: 12, width: 12 },
        iconStyle_10: { height: 10, width: 10 },
    })
    const cartItemStyle = StyleSheet.create({
        container: { flexDirection: 'row', padding: 10 },
        infoView: { marginLeft: 10, flex: 1 },
        titleTxt: { fontSize: 16, fontWeight: 'bold' },
        descriptionTxt: { fontSize: 14, color: 'gray' },
        subContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
        qtyContainer: { flexDirection: 'row', alignItems: 'center' },
        qtyTxt: { marginHorizontal: 10, fontSize: 16 },
        touchable: { padding: 5 },
        mainContainer: { flex: 1, padding: 10 },
        listView: { marginTop: 20, margin: 5 },
        flatListStyle: { marginTop: 5 },
        dexriptionTxt: { fontSize: 12, fontWeight: 'light' },

        priceTxt: { color: '#068c18', fontSize: 18, fontWeight: 'thin' },
        imageCart: { justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 10 },
        QtyTouchable: { height: 30, width: 30, borderWidth: 1, borderRadius: 5, alignItems: "center", justifyContent: "center" },
        qtyText: { fontSize: 12, color: "#000" },
        flexDirectionRow: { flexDirection: "row" },

    })
    return {
        homeStyle,
        cartItemStyle
    }
}
