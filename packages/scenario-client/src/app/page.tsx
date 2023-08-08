'use client';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import * as React from 'react';
import {Button} from '@/components/ui/button';
import useSWR from 'swr';
import {ApplicationState, getData} from '@alaarm/shared';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const fetcher = (url: string) => getData<ApplicationState>('/api/v1/state').then(({data}) => {
        if (!data) {
            return data;
        }
        console.log(data.scenarioRunning);
        if (data.scenarioRunning) {
            router.push('/qr');
        }
        return data;
    }
    );
    const {data, error, isLoading} = useSWR('/state', fetcher, {refreshInterval: 1000})
    ;

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex items-center flex-col justify-center space-y-4">
                <Alert variant="destructive">
                    <AlertTitle>
                        Wartebereich
                    </AlertTitle>
                    <AlertDescription>
                        Bitte warten Sie, bis das Szenario durch einen Mitarbeiter gestartet wird. Dieses Fenster wird
                        automatisch aktualisiert.
                    </AlertDescription>
                </Alert>

                <Button variant="default">
                    Aktualisieren
                </Button>
            </div>
        </div>

    );
}
