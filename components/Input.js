import React from 'react';

import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return (
        <TextInput {...props} style={{...styles.Input,...props.style}} />
    );
}

const styles = StyleSheet.create({
    Input: {
        borderBottomColor: "grey",
        height: 30,
        marginVertical: 10,
        borderBottomWidth: 1
    }
});

export default Input;