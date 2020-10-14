import React from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';

import colors from '../constants/colors';

const Header = props =>(
    <View style={{...styles.headerBase,...Platform.select({
        ios: styles.headerIos,
        android: styles.headerAndroid
        })}}>
        <Text style={styles.title}>{props.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    headerIos: {
        backgroundColor: "white",
        borderWidth: 1,
        borderBottomColor: "#ccc"
    },
    headerAndroid: {
        backgroundColor: colors.primary,
    },
    title: {
        fontSize: 18,
        color: Platform.OS === "ios"? colors.primary : "white"
    }
})

export default Header