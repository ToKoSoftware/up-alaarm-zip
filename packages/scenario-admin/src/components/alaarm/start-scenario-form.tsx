'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '@/components/ui/button';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {toast} from '@/components/ui/use-toast';
import {Textarea} from '@/components/ui/textarea';
import * as React from 'react';
import {useEffect} from 'react';
import {SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from '@/components/ui/sheet';
import {getApiUrl, postData, setApiUrl} from '@alaarm/shared';


const jsonSchema = z.string().refine((value) => {
    try {
        const schema = z.object({
            timeBeforeScenarioStarts: z.number().int().positive(),
            attendingPersons: z.number().int().positive(),
        });
        schema.parse(JSON.parse(value));
        return true;
    } catch (_) {
        return false;
    }
});

const FormSchema = z.object({
    secret: z.string().min(3, {
        message: 'Das Secret muss mindestens 3 Zeichen lang sein.',
    }),
    url: z.string().url({
        message: 'Gib eine gültige URL ein.',
    }),
    json: jsonSchema
});

export function StartScenarioForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const [apiUrl, setApiUrl] = React.useState('');
    const [secret, setSecret] = React.useState('');
    const [json, setJson] = React.useState('');

    useEffect(() => {
        setApiUrl(localStorage.getItem('apiUrl') || '');
        setSecret(localStorage.getItem('secret') || '');
        setJson(localStorage.getItem('json') || '');
    }, []);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setApiUrl(data.url);
        localStorage.setItem('secret', data.secret);
        localStorage.setItem('json', data.json);
        try {
            const result = await postData('/api/v1/scenario/start', data);
            toast({
                title: 'Szenario startet...',
                description: 'Die Daten wurden erfolgreich an den Controller gesendet'
            });
        } catch (error: any) {
            if (error?.response?.data?.data?.type === 'SCENARIO_ALREADY_RUNNING') {
                toast({
                    title: 'Szenario läuft bereits',
                    description: 'Bitte das Szenario zuerst stoppen',
                    variant: 'destructive'
                });
                return;
            }
            toast({title: 'Fehler', description: 'Ein Fehler ist aufgetreten', variant: 'destructive'});
            console.error('Fehler beim POST-Request:', error);
        }

    }

    const formClassNames = 'mt-32 mb-8';

    return (
        <SheetContent position="right" size="sm">
            <SheetHeader>
                <SheetTitle>Szenario konfigurieren</SheetTitle>
                <SheetDescription>
                    Füge hier die Daten für das Szenario ein.
                </SheetDescription>
            </SheetHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="url"
                        defaultValue={apiUrl}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={formClassNames}>Controller-URI</FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input placeholder="http://10.10.10.1:1337" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Die URI des Controllers, der das Szenario steuern soll.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="secret"
                        defaultValue={secret}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={formClassNames}>Secret</FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Input placeholder="*******" type="password" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Das Secret, das der Controller für die Authentifizierung benötigt.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="json"
                        defaultValue={json}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={formClassNames}>
                                    Konfiguration des Szenarios
                                </FormLabel>
                                <FormMessage/>
                                <FormControl>
                                    <Textarea
                                        placeholder="Szenario-Daten als JSON"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Die Daten für das Szenario im JSON Format.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <SheetFooter>
                        <Button type="submit">
                            Szenario starten
                        </Button>
                    </SheetFooter>
                </form>
            </Form>
        </SheetContent>
    );
}

