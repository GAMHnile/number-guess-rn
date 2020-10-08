import React from 'react';

import { View, Text, StyleSheet} from 'react-native';

import colors from '../constants/colors';

const Header = props =>(
    <View style={styles.header}>
        <Text style={styles.title}>{props.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primary
    },
    title: {
        fontSize: 18,
        color: "black"
    }
})

export default Header