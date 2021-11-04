// Learn more about Light and Dark modes:
// https://docs.expo.dev/guides/color-schemes/
import React from "react";
import {
    Text as DefaultText,
    useColorScheme,
    ScrollView as DefaultView,
    View as MiniView,
} from "react-native";

import Colors from "../constants/Colors";

export function useThemeColor(props, colorName) {
    const theme = useColorScheme();
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return Colors[theme][colorName];
    }
}

export function Text(props) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

    return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}


export function MView(props) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
        { light: lightColor, dark: darkColor },
        "background"
    );

    return <MiniView style={[{ backgroundColor }, style]} {...otherProps} />;
}