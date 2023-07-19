'use client';
import React, { useState, useEffect } from 'react';
import {Button} from '@/components/ui/button';
import './Reactionspeed.css';

const Reactionspeed = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [roundCount, setRoundCount] = useState(0);
    const [isLeftGreenVisible, setIsLeftGreenVisible] = useState(false);
    const [isRightGreenVisible, setIsRightGreenVisible] = useState(false);
    const [roundSuccess, setRoundSuccess] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        if (gameStarted) {
            // Start the game by showing a black screen for 2-6 seconds
            const blackScreenTimeout = setTimeout(() => {
                const isLeftGreen = Math.random() < 0.5;
                if (isLeftGreen) {
                    setIsLeftGreenVisible(true);
                } else {
                    setIsRightGreenVisible(true);
                }
                setRoundSuccess(false);
            }, getRandomDuration(2000, 6000));

            return () => clearTimeout(blackScreenTimeout);
        }
    }, [gameStarted, roundCount]);

    useEffect(() => {
        if (isLeftGreenVisible || isRightGreenVisible) {
            // Check if the user clicked the correct green square within 0.5 seconds
            const greenScreenTimeout = setTimeout(() => {
                setRoundSuccess(false);
                if (roundCount < 7) {
                    setGameOver(true);
                }
            }, 600);

            return () => clearTimeout(greenScreenTimeout);
        }
    }, [isLeftGreenVisible, isRightGreenVisible, roundCount]);

    useEffect(() => {
        if (roundSuccess) {
            // Start the next round if the user was successful
            const nextRoundTimeout = setTimeout(() => {
                if (roundCount === 6) {
                    setGameWon(true);
                } else {
                    setRoundCount(roundCount + 1);
                    setIsLeftGreenVisible(false);
                    setIsRightGreenVisible(false);
                    setRoundSuccess(false);
                }
            }, 2000);

            return () => clearTimeout(nextRoundTimeout);
        }
    }, [roundCount, roundSuccess]);

    const getRandomDuration = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setRoundCount(1);
    };

    const handleGreenClick = (isLeftGreen) => {
        if ((isLeftGreen && isLeftGreenVisible) || (!isLeftGreen && isRightGreenVisible)) {
            setIsLeftGreenVisible(false);
            setIsRightGreenVisible(false);
            setRoundSuccess(true);
        }
    };

    return (
        <div className="reactionspeed">
            {!gameStarted && !gameOver && (
                <div className="instructions">
                    <p className="instruction-text">
          Etwas scheint mit der Kalibirerung der Maschine ein Probkem zu geben, welche schwerwiegende Fehler ausloest.
          Um alle moeglichen Fehlerquellen auszuschließen, muessen die Eingaben neu kalibriert werden.
          Zur korrekten Kalibierung muess der richtige gruen aufleuchtende Bereich innerhalb von 0,6 Sekunden gedrueckt werden.
                    </p>
                    <p className="instruction-text">
            Die Bereiche fangen in einem schwarzen Zustand an. Falls du laenger als 0,6 Sekunden brauchst den gruen aufleuchtenden Bereich zu druekcne, kann die Maschine nicht   kalibriert werden. Es benoetigt 6 erfolgreiche Kalibrierungen.
                    </p>
                </div>
            )}
            {!gameStarted && !gameOver && (
                <Button onClick={handleStartGame}>
          Kalibrierung starten
                </Button>
            )}
            {gameStarted && (
                <div className="game-container">
                    <div className="square-container">
                        {isLeftGreenVisible && !gameOver ? (
                            <div className="green-screen left-square" onClick={() => handleGreenClick(true)} />
                        ) : (
                            <div className="black-screen left-square" />
                        )}
                        <div className="gap" />
                        {isRightGreenVisible && !gameOver ? (
                            <div className="green-screen right-square" onClick={() => handleGreenClick(false)} />
                        ) : (
                            <div className="black-screen right-square" />
                        )}
                    </div>
                </div>
            )}
            <div className="round-counter">Runde: {roundCount}</div>
            {gameOver && (
                <div className="lose-message">Die Kalibierung war nicht erfolgreich!</div>
            )}
            {gameWon && (
                <div className="win-message">Die Kalibrierung war erfolgreich!</div>
            )}
        </div>
    );
};

export default Reactionspeed;
