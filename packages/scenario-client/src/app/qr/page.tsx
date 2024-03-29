'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import './qr.css';
import useSWR from 'swr';
import {ApplicationState, getData} from '@alaarm/shared';
import {QrScanner} from '@yudiel/react-qr-scanner';

const App = () => {
    const [scannedCode, setScannedCode] = useState('');
    const [isError, setIsError] = useState(false);
    const [isReaderOpen, setIsReaderOpen] = useState(false);
    const [expectedCode, setExpectedCode] = useState('machine-1');

    const fetcher = (url: string) => getData<ApplicationState>('/api/v1/state').then(({data}) => {
        if (!data) {
            return data;
        }
        if (data.scenarioRunning) {
            router.push('/qr');
        }
        return data;
    }
    );
    const {data, error, isLoading} = useSWR('/state', fetcher, {refreshInterval: 1000});

    const handleScan = (data: string) => {
        if (data) {
            setScannedCode(data);
            setIsReaderOpen(false);

            // Check if the scanned code matches the expected code
            if (data === expectedCode) {
                setIsError(false);
                setTimeout(() => {
                    redirectToGame(data);
                }, 2000); // Add a delay of 2000 milliseconds (2 seconds)
            } else {
                setIsError(true);
                // Add a delay of 2000 milliseconds (2 seconds) and then start the QR reader again
                setTimeout(() => {
                    setScannedCode('');
                    setIsReaderOpen(true);
                }, 2000);
            }
        }
    };


    const handleError = (error: any) => {
        console.error(error);
    };

    const handleButtonClick = () => {
        setIsReaderOpen(true);
    };

    const router = useRouter();

    const redirectToGame = (machineCode: string) => {
        switch (machineCode) {
        case 'machine-1':
            router.push('quest/numbers-basic');
            break;
        case 'machine-2':
            router.push('quest/reaction');
            break;
        case 'machine-3':
            router.push('quest/numbers-advanced');
            break;
        default:
            // Handle unexpected machine codes
        }
    };

    const renderMessage = () => {
        if (isError) {
            return <div className="message">Falscher Code! Gehen Sie zu {expectedCode}.</div>;
        } else if (scannedCode === expectedCode) {
            return (
                <div className="message">
                    Dies ist der richtige Code! Starte Spiel...
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="container">
            {!isReaderOpen && !scannedCode && (
                <Button onClick={handleButtonClick}>Mit Maschine interagieren</Button>
            )}
            {renderMessage()}
            {isReaderOpen && !scannedCode && (
                <QrScanner
                    onDecode={(result: string) => {
                        console.log(result);
                        handleScan(result);
                    }}
                    onError={(error) => {
                        console.log(error?.message);
                        handleError(error);
                    }}
                />
            )}
        </div>
    );
};

export default App;



