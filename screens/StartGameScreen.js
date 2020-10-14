import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import colors from "../constants/colors";

const StartGameScreen = (props) => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);


  useEffect(()=>{
    const updateWidth = ()=>{
      setButtonWidth(Dimensions.get("window").width / 4);
    }
    Dimensions.addEventListener("change", updateWidth);

    return ()=> Dimensions.removeEventListener("change", updateWidth);
  })

  const numberInputHandler = (text) => {
    setEnteredNumber(text.replace(/[^0-9]/g, ""));
  };

  const cancelInputHandler = () => {
    setEnteredNumber("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNnumber = parseInt(enteredNumber);
    if (chosenNnumber > 99 || chosenNnumber <= 0 || isNaN(chosenNnumber)) {
      Alert.alert("Invalid number!", "Number must be betwen 1 and 99", [
        { text: "Okay", style: "destructive", onPress: cancelInputHandler },
      ]);
      setConfirmed(false);
      return;
    }
    setSelectedNumber(chosenNnumber);
    setConfirmed(true);
    setEnteredNumber("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected: </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)} >START GAME</MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30} >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a new game</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit={true}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredNumber}
              />
              <View style={styles.ButtonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Cancel"
                    onPress={cancelInputHandler}
                    color={colors.secondary}
                  />
                </View>
                <View style={{width: buttonWidth}}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    alignItems: "center",
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  //button: { width: Dimensions.get("window").width / 4 },
  input: { width: 25 },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
