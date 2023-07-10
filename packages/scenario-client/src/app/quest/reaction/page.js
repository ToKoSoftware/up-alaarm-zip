'use client';
import React, { useState, useEffect } from 'react';
import './Reactionspeed.css';

const Page = () => {
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
                if (roundCount < 4) {
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
            There is something wrong with the calibration of the machine which
            leads to major malfunctions. It is vital that the machine inputs are
            correctly calibrated to eliminate any sources of error. To ensure
            correct calibration, click the correct square as fast as possible whenever
            it turns green.
                    </p>
                    <p className="instruction-text">
            The squares will start in a black state. If you take longer than 0.6
            seconds to click the green square, the machine can&apos;t calibrate. It
            takes 6 calibration inputs to successfully calibrate the machine.
                    </p>
                </div>
            )}
            {!gameStarted && !gameOver && (
                <button onClick={handleStartGame} className="start-button">
          Start Game
                </button>
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
            <div className="round-counter">Round: {roundCount}</div>
            {gameOver && (
                <div className="lose-message">You did not calibrate correctly!</div>
            )}
            {gameWon && (
                <div className="win-message">You calibrated the machine correctly!</div>
            )}
        </div>
    );
};

export default Page;
