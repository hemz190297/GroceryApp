import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
const { width } = Dimensions.get('window')

export default function HeaderStyle() {
    const theme = useTheme();
    const headerStyle = StyleSheet.create({
        header: { backgroundColor: theme.colors.header, justifyContent: "space-between", flexDirection: "row", alignItems: "center", padding: 12, marginTop: 20 },
        textColor: {
            color: '#fff'
        },
        titleText: {
            color: '#fff',
            fontSize: 16,
            fontFamily: "bold"
        },
        IconStyle: {
            height: 24,
            width: 24,
            tintColor: "#fff"
        },
        rightIconStyle: {
            height: 24,
            width: 24,
            tintColor: "#fff"
        },

    })
    return {
        headerStyle
    }
}