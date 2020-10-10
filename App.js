import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Header from "./components/Header";

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [isAppready, setIsAppReady] = useState(false);

  if (!isAppready) {
    return <AppLoading 
            startAsync={fetchFonts} 
            onFinish={() => { setIsAppReady(true) }} 
            onError={(err) => console.log(err)} 
            />
  }


  const restartGameHandler = () => {
    setUserNumber(null);
    setRounds(0);
  }

  const getUserNumber = selectedNumber => {
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = roundsCount => {
    setRounds(roundsCount);
  }

  let content = <StartGameScreen onStartGame={getUserNumber} />;

  if (!!userNumber && !rounds) {
    content = <GameScreen onGameEnd={gameOverHandler} userChoice={userNumber} />;
  } else if (!!rounds) {
    content = <GameOverScreen numRounds={rounds} userNumber={userNumber} onRestart={restartGameHandler} />
  }
  //content = <GameOverScreen numRounds={2} userNumber={22} onRestart={restartGameHandler} />
  return (
    <View style={styles.screen}>
      <Header title="Guess the number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
