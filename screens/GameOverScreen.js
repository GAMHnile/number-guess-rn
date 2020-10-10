import React from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const GameOver = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/success.png')} />
            </View>
            <BodyText>It took {props.numRounds} rounds</BodyText>
            <BodyText>Your number was {props.userNumber}</BodyText>
            <Button title="Restart Game" onPress={props.onRestart} />
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
    }
})

export default GameOver