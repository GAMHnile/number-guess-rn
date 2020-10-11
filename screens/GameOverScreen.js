import React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import colors from '../constants/colors';

const GameOver = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/success.png')} />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.result}>Your phone took <Text style={styles.highlight}>{props.numRounds}</Text> rounds 
                 to guess your number <Text style={styles.highlight}>{props.userNumber}</Text>.</BodyText>
            </View>
            <MainButton onPress={props.onRestart} >Restart Game</MainButton>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 150,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    highlight: {
        color: colors.primary
    },
    resultContainer:{
        marginVertical: 15,
        marginHorizontal: 30
    },
    result:{
        textAlign: "center",
        fontSize: 20
    }
})

export default GameOver