'use client';

import React, { useState, useEffect } from 'react';
import './WireGame.css';

const Page = () => {
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
                    <p>
        The algorithm of the machine seems to have a problem. <br />
        In order to repair the machine, you need to click the numbers 1 through 10 in ascending order. <br />
        After 5 and 10 seconds, the numbers will get scrambled. <br />
         You will have 15 seconds once you start.
                    </p>
                    <button onClick={startGame}>Click here to start the game</button>
                </div>
            )}
            {gameStarted && !gameOver && (
                <div>
                    <p className="countdown">Time remaining: {countdown} seconds</p>
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
                        ? 'You won!'
                        : 'You lost!'}
                </p>
            )}
        </div>
    );
};

export default Page;
