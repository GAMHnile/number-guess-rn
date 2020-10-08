import React from 'react';
import { View, StyleSheet, Text} from 'react-native';

import colors from "../constants/colors";

const NumberContainer = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginVertical: 10,
        borderRadius: 10
    },
    number: {
        fontSize: 22,
        color: colors.secondary
    }
});

export default NumberContainer;