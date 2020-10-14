import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image, Text, ScrollView, Dimensions } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import colors from '../constants/colors';

const GameOver = props => {
    const [availableWidth, setAvailableWidth] = useState(Dimensions.get("window").width);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableWidth(Dimensions.get("window").width)
        }
        Dimensions.addEventListener("change", updateLayout)
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        }
    })

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is over!</TitleText>
                <View style={{
                    ...styles.imageContainer,
                    width: availableWidth>500? availableWidth * 0.5: availableWidth * 0.7,
                    height: availableWidth>500? availableWidth * 0.5: availableWidth * 0.7,
                    borderRadius: availableWidth>500? (availableWidth * 0.5) / 2: (availableWidth * 0.7) / 2,
                }}>
                    <Image style={styles.image} source={require('../assets/success.png')} />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.result}>Your phone took <Text style={styles.highlight}>{props.numRounds}</Text> rounds
                 to guess your number <Text style={styles.highlight}>{props.userNumber}</Text>.</BodyText>
                </View>
                <MainButton onPress={props.onRestart} >Restart Game</MainButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: (Dimensions.get("window").width * 0.7) / 2,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    highlight: {
        color: colors.primary
    },
    resultContainer: {
        marginVertical: Dimensions.get("window").width / 60,
        marginHorizontal: Dimensions.get("window").width / 30
    },
    result: {
        textAlign: "center",
        fontSize: Dimensions.get("window").height < 600 ? 15 : 20
    }
})

export default GameOver