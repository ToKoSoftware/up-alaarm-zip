'use client';
import React, { useState, useEffect } from 'react';
import {Button} from '@/components/ui/button';
import './WireGame.css';
import IntroScreen from '@/components/generic/intro-screen';

const WireGame = () => {
    const [numbers, setNumbers] = useState([]);
    const [countdown, setCountdown] = useState(15);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [expectedNumber, setExpectedNumber] = useState(1);

    useEffect(() => {
        if (gameStarted && countdown > 0) {
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [gameStarted, countdown]);

    useEffect(() => {
        if (countdown === 0) {
            // Game over
            setGameOver(true);
        } else if (countdown === 10 || countdown === 5) {
            // Change position of numbers at 10 seconds and 5 seconds
            const updatedNumbers = numbers.map((number) => ({
                ...number,
                left: Math.floor(Math.random() * 80) + 'vw',
                top: Math.floor(Math.random() * 60) + 'vh',
            }));
            setNumbers(updatedNumbers);
        }
    }, [countdown, numbers]);

    useEffect(() => {
    // Generate the initial numbers when the game starts
        if (gameStarted) {
            const newNumbers = Array.from({ length: 10 }, (_, index) => ({
                number: index + 1,
                clicked: false,
                left: Math.floor(Math.random() * 80) + 'vw',
                top: Math.floor(Math.random() * 60) + 'vh',
            }));
            setNumbers(newNumbers);
        }
    }, [gameStarted]);

    const startGame = () => {
        setGameStarted(true);
    };

    const handleClick = (index, clickedNumber) => {
        if (!gameOver) {
            if (clickedNumber === expectedNumber && !numbers[index].clicked) {
                const updatedNumbers = [...numbers];
                updatedNumbers[index].clicked = true;
                setNumbers(updatedNumbers);

                if (expectedNumber === 10) {
                    // Player won the game
                    setGameOver(true);
                } else {
                    setExpectedNumber((prevNumber) => prevNumber + 1);
                }
            } else {
                // Player clicked the wrong number, game over
                setGameOver(true);
            }
        }
    };

    return (
        <div className="wire-game">
            {!gameStarted && (
                <div>
                    <IntroScreen title='Bug im Algorithmus!' description='Der Algorithmus der Maschine scheint ein Problem zu haben. Mehrere Prozesse scheinen separat zu laufen, die wieder in die richtige Reihenfolge gebracht werden müssen.
        Klicke die Nummern 1 bis 10 in aufsteigender Reihenfolge an, um dies zu tun.
        Nach jeweils 5 und 10 Sekunden werden die Zahlen gemischt.
        Für diese Reparatur sind lediglich 15 Sekunden vorgesehen!'></IntroScreen>

                    <Button onClick={startGame}>Hier klicken um die Reparatur zu starten</Button>
                </div>
            )}
            {gameStarted && !gameOver && (
                <div>
                    <p className="countdown">Zeit uebrig: {countdown} Sekunden</p>
                    <div className="grid">
                        {numbers.map((number, index) => (
                            <div
                                key={index}
                                className={`square${number.clicked ? ' clicked' : ''}`}
                                style={{ left: number.left, top: number.top }}
                                onClick={() => handleClick(index, number.number)}
                            >
                                {number.number}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {gameOver && (
                <p className="result">
                    {numbers.every(
                        (num, index) => num.clicked || index + 1 > expectedNumber
                    )
                        ? 'Das Problem wurde behoben!'
                        : 'Das Problem konnte nicht behoben werden!'}
                </p>
            )}
        </div>
    );
};

export default WireGame;
