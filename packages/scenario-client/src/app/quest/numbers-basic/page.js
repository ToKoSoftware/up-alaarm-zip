"use client";
import React, { useState, useEffect } from 'react';
import {Button} from '@/components/ui/button';
import './numbers-basic.css';

const StartPage = ({ onStartGame }) => {
  return (
    <div>
      <h1>Die Werkschritt-Reihenfolge der Maschine scheinen durcheinander gebracht zu sein.</h1>
      <h2>Klicke auf die Nummern 1 bis 10 in aufsteigender Reihenfolge, um die richtige Reihenfolge wiederherzustellen.</h2>
      <h2>Fuer die Operation sind nur 10 Sekunden vorgesehen!</h2>
      <Button onClick={onStartGame}>Reihenfolge wiederherstellen</Button>
    </div>
  );
};

const GamePage = ({ timer, theme, boxes, selectedNumbers, handleBoxClick }) => {
  return (
    <div>
      <h1 style={{ color: theme.textColor }}>Reihenfolge wiederherstellen!</h1>
      <h2 style={{ color: theme.textColor }}>Noch verbleibende Zeit: {timer} Sekunden</h2>
      <div className="box-container">
        {boxes.map(box => (
          <div
            key={box.number}
            className={`box ${selectedNumbers.includes(box.number) ? 'selected' : ''}`}
            style={{
              backgroundColor: selectedNumbers.includes(box.number)
                ? theme.selectedColor
                : theme.backgroundColor,
              color: selectedNumbers.includes(box.number) ? '#fff' : theme.textColor
            }}
            onClick={() => handleBoxClick(box.number)}
          >
            {box.number}
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('start');
  const [gameStarted, setGameStarted] = useState(false);
  const [boxes, setBoxes] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [timer, setTimer] = useState(10);
  const [theme, setTheme] = useState({
    backgroundColor: '#f0f0f0',
    textColor: '#555',
    selectedColor: '#007bff'
  });

  useEffect(() => {
    if (gameStarted && timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [gameStarted, timer]);

  useEffect(() => {
    if (timer === 0) {
      endGame();
    }
  }, [timer]);

  const startGame = () => {
    setGameStarted(true);
    setSelectedNumbers([]);
    setBoxes(getRandomBoxes());
    setTimer(10);
    setTheme(getRandomTheme());
    setCurrentPage('game');
  };

  const getRandomBoxes = () => {
    const numbers = Array.from({ length: 10 }, (_, index) => index + 1);
    const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
    return shuffledNumbers.map(number => ({
      number,
      selected: false
    }));
  };

  const getRandomTheme = () => {
    const themes = [
      {
        backgroundColor: '#f0f0f0',
        textColor: '#555',
        selectedColor: '#007bff'
      },
      {
        backgroundColor: '#e9ecef',
        textColor: '#212529',
        selectedColor: '#dc3545'
      },
      {
        backgroundColor: '#f8f9fa',
        textColor: '#343a40',
        selectedColor: '#28a745'
      }
      // Add more themes here
    ];
    const randomIndex = Math.floor(Math.random() * themes.length);
    return themes[randomIndex];
  };

  const handleBoxClick = number => {
    if (gameStarted && !selectedNumbers.includes(number)) {
      setSelectedNumbers(prevNumbers => [...prevNumbers, number]);
      checkGameStatus(number);
    }
  };

  const checkGameStatus = number => {
    if (number === selectedNumbers.length + 1) {
      if (selectedNumbers.length === 9) {
        endGame(true);
      }
    } else {
      endGame(false);
    }
  };

  const endGame = isWin => {
    setGameStarted(false);
    if (isWin) {
      alert('Die richtige Reihenfolge wurde hergestellt!');
    } else {
      alert('Die richtige Reihenfolge konnte nicht hergestellt werden!');
    }
    setCurrentPage('start');
  };

  return (
    <div className="App">
      {currentPage === 'start' && <StartPage onStartGame={startGame} />}
      {currentPage === 'game' && (
        <GamePage
          timer={timer}
          theme={theme}
          boxes={boxes}
          selectedNumbers={selectedNumbers}
          handleBoxClick={handleBoxClick}
        />
      )}
    </div>
  );
};

export default App;
