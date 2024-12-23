import { View, TouchableOpacity, Image, ImageSourcePropType, Text } from 'react-native';
import React, { useState } from 'react';
import HeaderStyle from './HeaderStyle';
import { useSelector } from 'react-redux';

type HeaderProps = {
    leftIcon: ImageSourcePropType;
    rightIcon: ImageSourcePropType;
    title: string;
    onClickLeftIcon: () => void;
    onClickRightIcon: () => void;
};

const Header = ({ leftIcon, rightIcon, title, onClickLeftIcon, onClickRightIcon }: HeaderProps) => {
    const { headerStyle } = HeaderStyle();
    const cartList = useSelector((state: any) => state.addToCartListState.data);
    const [cartLength, setCartLength] = useState(false);

    return (
        <View style={headerStyle.header}>
            <TouchableOpacity onPress={onClickLeftIcon}>
                <Image source={leftIcon} style={headerStyle.IconStyle} />
            </TouchableOpacity>
            <Text style={headerStyle.titleText}>{title}</Text>
            <TouchableOpacity onPress={onClickRightIcon}>
                <Image source={rightIcon} style={headerStyle.rightIconStyle} />
                {cartLength && (<View style={{ borderRadius: 30, backgroundColor: 'red', position: "absolute", left: 16, bottom: 12, height: 17, width: 17, justifyContent: "center", alignItems: "center", flex: 1 }}>
                    <Text style={{ textAlign: "center", position: "absolute", fontSize: 10, color: "#fff" }}>{cartList.length}</Text>
                </View>)}

            </TouchableOpacity>
        </View>
    );
};
export default Header;
