'use client';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import * as React from 'react';
import {Button} from '@/components/ui/button';

export default function Home() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex items-center flex-col justify-center space-y-4">
                <Alert variant="destructive">
                    <AlertTitle>
                        Wartebereich
                    </AlertTitle>
                    <AlertDescription>
                        Bitte warten Sie, bis das Szenario durch einen Mitarbeiter gestartet wird. Dieses Fenster wird automatisch aktualisiert.
                    </AlertDescription>
                </Alert>

                <Button variant="default">
                    Aktualisieren
                </Button>
            </div>
        </div>

    );
}
