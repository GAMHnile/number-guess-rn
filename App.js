import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from "./components/Header";

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';



export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);


  const getUserNumber = selectedNumber =>{
    setUserNumber(selectedNumber)
  }

  const gameOverHandler = roundsCount =>{
    setRounds(roundsCount);
  }

  let content = <StartGameScreen onStartGame={getUserNumber} />;

  if(!!userNumber && !rounds){
    content = <GameScreen onGameEnd={gameOverHandler} userChoice={userNumber} />;
  }else if(!!rounds) {
    content = <GameOverScreen />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess the number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});
