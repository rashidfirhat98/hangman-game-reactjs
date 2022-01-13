import React, { useEffect, useState } from 'react';
import Figure from './components/Figure';
import Header from './components/Header';
import Word from './components/Word';
import WrongLetters from './components/WrongLetters';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show } from './helpers/helpers'

import './App.css';


const words = ['application', 'programming', 'interface', 'wizard', 'xylophone'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (playable && e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);

          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter])

          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);

  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    selectedWord = words[Math.floor(Math.random() * words.length)]; 
  }
  
  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        
      </div>
      <Popup selectedWord={selectedWord} correctLetters={correctLetters} wrongLetters={wrongLetters}
       setPlayable={setPlayable} playAgain={playAgain}/>
      <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
