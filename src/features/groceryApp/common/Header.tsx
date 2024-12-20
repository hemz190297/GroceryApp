import { View, TouchableOpacity, Image, ImageSourcePropType, Text } from 'react-native';
import React from 'react';
import HeaderStyle from './HeaderStyle';

type HeaderProps = {
    leftIcon: ImageSourcePropType;
    rightIcon: ImageSourcePropType;
    title: string;
    onClickLeftIcon: () => void;
};

const Header = ({ leftIcon, rightIcon, title, onClickLeftIcon }: HeaderProps) => {
    const { headerStyle } = HeaderStyle();
    return (
        <View style={headerStyle.header}>
            <TouchableOpacity onPress={onClickLeftIcon}>
                <Image source={leftIcon} style={headerStyle.IconStyle} />
            </TouchableOpacity>
            <Text style={headerStyle.titleText}>{title}</Text>
            <TouchableOpacity>
                <Image source={rightIcon} style={headerStyle.rightIconStyle} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;
