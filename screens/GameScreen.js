import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

const generateRandomNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomNum(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNum(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);
  const { userChoice, onGameEnd } = props;

  useEffect(()=>{
      //check if the game has guessed correctly
    if(currentGuess === userChoice){
        onGameEnd(rounds);
    }
  }, [onGameEnd, currentGuess, userChoice]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const guessNextNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Wrong direction!", "You trying to trick me", [
        { text: "okay", style: "cancel" },
      ]);
      return;
    }
    if(direction === "lower"){
        currentHigh.current = currentGuess;
    }else {
        currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomNum(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setRounds(curRounds=> curRounds + 1);
  };
  return (
    <View style={styles.screen}>
      <Text>Oponents guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={guessNextNumber.bind(this, "lower")} />
        <Button title="HIGHER" onPress={guessNextNumber.bind(this, "higher")} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    maxWidth: "80%",
    marginTop: 15,
  },
});

export default GameScreen;
