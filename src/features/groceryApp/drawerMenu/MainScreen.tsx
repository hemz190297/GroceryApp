import { Keyboard, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Appbar, FAB } from 'react-native-paper';
import Home from '../tabs/Home';
import Favourite from '../tabs/Favourite';
import Search from '../tabs/Search';
import Notification from '../tabs/Notification';
import Account from '../tabs/Account';

const BOTTOM_APPBAR_HEIGHT = 80;
const MainScreen = () => {
    const { bottom } = useSafeAreaInsets();
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);
    const [keyBoardVisible, setkeyBoardVisible] = useState(false);

    useEffect(() => {                                                             //still not work while clicking outside of keyboard for clode keyboard
        const keyboardWillShowListener = Keyboard.addListener(
            "keyboardWillShow",
            (e) => {
                setkeyBoardVisible(true);
            }
        );
        const keyboardWillHideListener = Keyboard.addListener(
            "keyboardWillHide",
            () => {
                setkeyBoardVisible(false);
            }
        );

        return () => {
            keyboardWillHideListener.remove();
            keyboardWillShowListener.remove();
        };
    }, []);
    return (
        <>
            {selectedTab === 0 ? (<Home />) : selectedTab == 1 ? (<Favourite />) : selectedTab == 2 ? (<Search />) : selectedTab == 3 ? (<Notification />) : selectedTab == 4 ? (<Account />) : (<Home />)}
            {!keyBoardVisible &&
                <Appbar
                    style={[
                        styles.bottom,
                        {
                            height: BOTTOM_APPBAR_HEIGHT + bottom,
                            backgroundColor: theme.colors.elevation.level2,
                        },
                    ]}
                    safeAreaInsets={{ bottom }}>

                    <Appbar.Action icon={selectedTab == 0 ? "home" : "home-outline"} onPress={() => { setSelectedTab(0) }} />
                    <Appbar.Action icon={selectedTab == 1 ? "heart" : "heart-outline"} onPress={() => { setSelectedTab(1) }} />
                    <Appbar.Action icon="magnify" onPress={() => { setSelectedTab(2) }} />
                    <Appbar.Action icon={selectedTab == 3 ? "bell" : "bell-outline"} onPress={() => { setSelectedTab(3) }} />
                    <FAB
                        mode="flat"
                        size="medium"
                        icon={selectedTab == 4 ? "account" : "account-outline"}
                        onPress={() => { setSelectedTab(4) }}
                    />
                </Appbar>
            }
        </>
    )
}
const styles = StyleSheet.create({
    bottom: {
        backgroundColor: 'aquamarine',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "space-around",
    },
    fab: {
        position: 'absolute',
        right: 16,
    },
});
export default MainScreen;
