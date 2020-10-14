import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import colors from '../constants/colors';

const MainButton = props => {
    let ButtonContainer = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        ButtonContainer = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonWrapper}>
            <ButtonContainer activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.text}>{props.children}</Text>
                </View>
            </ButtonContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        borderRadius: 25,
        overflow: "hidden"
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: colors.primary,
        borderRadius: 25
    },
    text: {
        fontFamily: "open-sans",
        fontSize: 20,
        color: "white"
    }
})

export default MainButton;