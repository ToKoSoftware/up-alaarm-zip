'use client';

import * as React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
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
import {Textarea} from '@/components/ui/textarea';

export default function Home() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex items-center justify-center space-x-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="default">
                        Szenario starten
                        </Button>
                    </SheetTrigger>
                    <SheetContent position="right" size="sm">
                        <SheetHeader>
                            <SheetTitle>Szenario konfigurieren</SheetTitle>
                            <SheetDescription>
                            Füge hier die Daten für das Szenario ein.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Controller-Url
                                </Label>
                                <Input id="name" placeholder="controller.alaarm.cloud" className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                Secret
                                </Label>
                                <Input id="name" type="password" placeholder="******" className="col-span-3"/>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                JSON-Konfiguration
                                </Label>
                                <Textarea id="username" placeholder="Test" className="col-span-3"/>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">
                                Szenario starten
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <Button variant="destructive">
                Stop
                </Button>
            </div>
        </div>

    );
}
