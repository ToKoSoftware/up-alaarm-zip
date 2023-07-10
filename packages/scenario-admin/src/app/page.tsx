'use client';

import * as React from 'react';
import {Button} from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {StartScenarioForm} from '@/components/alaarm/start-scenario-form';
import {Toaster} from '@/components/ui/toaster';
import {postData} from '@alaarm/shared';
import {toast, useToast} from '@/components/ui/use-toast';

export default function Home() {
    const { toast } = useToast();
    const handleStop = async () => {
        try {
            const result = await postData('/api/v1/scenario/stop', null);
            console.log('POST-Request erfolgreich:', result);
            toast({title: 'Szenario gestoppt', description: 'Das Szenario wurde erfolgreich gestoppt'});
        } catch (error) {
            toast({title: 'Fehler', description: 'Das Szenario konnte nicht gestoppt werden', variant: 'destructive'});
            console.error('Fehler beim POST-Request:', error);
        }
    };


    return (
        <>
            <Toaster/>
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <div className="flex items-center justify-center space-x-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="default">
                                Szenario starten
                            </Button>
                        </SheetTrigger>
                        <StartScenarioForm></StartScenarioForm>
                    </Sheet>
                    <Button variant="destructive" onClick={handleStop}>
                        Stop
                    </Button>
                </div>
                <Toaster/>
            </div>
        </>
    );
}
