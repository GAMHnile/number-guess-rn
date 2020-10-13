import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem = (dataLength, dataItem) => (
  <View style={styles.listItem} >
    <BodyText>#{dataLength - dataItem.index}</BodyText>
    <BodyText>{dataItem.item}</BodyText>
  </View>
)

const GameScreen = (props) => {
  const initialGuess = generateRandomNum(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [prevGuesses, setPrevGuesses] = useState([initialGuess.toString()]);
  const { userChoice, onGameEnd } = props;

  useEffect(() => {
    //check if the game has guessed correctly
    if (currentGuess === userChoice) {
      onGameEnd(prevGuesses.length);
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
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNum(currentLow.current, currentHigh.current, currentGuess);
    setCurrentGuess(nextNumber);
    setPrevGuesses(curPrevGuesses => [nextNumber.toString(), ...curPrevGuesses]);
  };
  return (
    <View style={styles.screen}>
      <Text>Oponents guess:</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={guessNextNumber.bind(this, "lower")} >
          <Ionicons name="md-remove" size={18} color="white" />
        </MainButton>
        <MainButton onPress={guessNextNumber.bind(this, "higher")}>
          <Ionicons name="md-add" size={18} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {
            prevGuesses.map((guess, index) => renderListItem(guess, prevGuesses.length - index))
          }
        </ScrollView> */}
        <FlatList keyExtractor={(item) => item}
          data={prevGuesses}
          renderItem={renderListItem.bind(this, prevGuesses.length)}
          contentContainerStyle={styles.list}
        />
      
      </View>
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
    width: 400,
    maxWidth: "95%",
    marginTop: 15,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    width: "100%"
  },
  listContainer: {
    width: "60%",
    flex: 1
  },
  list: {
    //alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1
  }
});

export default GameScreen;
