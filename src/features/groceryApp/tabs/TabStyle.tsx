import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper';

export default function TabStyle() {
    const homeStyle = StyleSheet.create({
        container: {
            flexDirection: "row", marginTop: 10, paddingHorizontal: 10, flex: 1
        },
        imageStyle: { height: 100, width: 100 },
        infoView: { margin: 5, width: "70%", },
    })
    return {
        homeStyle,
    }
}
