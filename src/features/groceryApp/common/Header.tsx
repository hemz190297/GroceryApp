import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, ImageSourcePropType } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderStyle from './HeaderStyle';

type HeaderProps = {
    leftIcon: ImageSourcePropType;
    rightIcon: ImageSourcePropType;
    title: string;
    onClickLeftIcon: () => void;
    onClickRightIcon: () => void;
    isCart: boolean;
    lengthShown: boolean;
};

const Header: React.FC<HeaderProps> = ({
    leftIcon,
    rightIcon,
    title,
    onClickLeftIcon,
    onClickRightIcon,
    isCart,
    lengthShown,
}) => {
    const { headerStyle } = HeaderStyle();
    const cartList = useSelector((state: any) => state.addToCartListState.data);
    const [cartLength, setCartLength] = useState(cartList.length);

    useEffect(() => {
        setCartLength(cartList.length);
    }, [cartList]);

    return (
        <View style={headerStyle.header}>
            <TouchableOpacity onPress={onClickLeftIcon}>
                <Image source={leftIcon} style={headerStyle.iconStyle} />
            </TouchableOpacity>

            <Text style={headerStyle.titleText}>{title}</Text>

            {!isCart && (
                <TouchableOpacity onPress={onClickRightIcon} style={headerStyle.rightIconContainer}>
                    <Image source={rightIcon} style={headerStyle.rightIconStyle} />
                    {lengthShown && (
                        <View style={headerStyle.cartBadge}>
                            <Text style={headerStyle.cartBadgeText}>{cartLength}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};
export default Header;
