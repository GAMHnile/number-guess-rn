import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    button:{
        paddingVertical: 12,
        paddingHorizontal: 30,
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