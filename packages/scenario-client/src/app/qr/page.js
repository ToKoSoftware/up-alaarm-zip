'use client';
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import './qr.css';

const App = () => {
    const [scannedCode, setScannedCode] = useState('');
    const [isError, setIsError] = useState(false);
    const [isReaderOpen, setIsReaderOpen] = useState(false);

    const expectedCode = 'https://de.wikipedia.org'; // Beispielcode zum Vergleich

    const handleScan = (data) => {
        if (data) {
            setScannedCode(data);

            // Überprüfen, ob der gescannte Code mit dem erwarteten Code übereinstimmt
            if (data === expectedCode) {
                setIsError(false);
                setIsReaderOpen(false);
            } else {
                setIsError(true);
            }
        }
    };

    const handleError = (error) => {
        console.error(error);
    };

    const handleButtonClick = () => {
        setIsReaderOpen(true);
    };

    const renderMessage = () => {
        if (isError && scannedCode !== expectedCode) {
            return <div className="message">Falsche Maschine! Gehen Sie zu xy.</div>;
        } else if (scannedCode) {
            return (
                <div className="message">
          Dies ist der richtige Code! Starte Spiel...
                    {/* Fügen Sie hier den Code hinzu, um das Spiel zu starten */}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="container">
            {!isReaderOpen && !scannedCode && (
                <button className="button" onClick={handleButtonClick}>Mit Maschine interagieren</button>
            )}
            {renderMessage()}
            {isReaderOpen && !scannedCode && (
                <QrReader delay={300} onError={handleError} onScan={handleScan} className="qr-reader" />
            )}
        </div>
    );
};

export default App;
