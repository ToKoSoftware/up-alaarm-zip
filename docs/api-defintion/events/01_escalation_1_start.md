# Eskalation 1 Starten
```json
{
  "eventType": "general/escalation1/start",
  "timestamp": 1526388471
}
```

## Förderband stoppen
ID auf BPMN Diagramm: `6`

```json
{
  "eventType": "conveyor/stop",
  "timestamp": 1526388471
}
```

## Subwoofer starten
ID auf BPMN Diagramm: `3`

```json
{
  "eventType": "subwoofer/start",
  "timestamp": 1526388471
}
```

## Lautsprecher starten
ID auf BPMN Diagramm: `4`

```json
{
  "eventType": "speaker/start",
  "timestamp": 1526388471,
  "payload": {
    "soundId": "sound-id"
  }
}
```

## Andon starten

```TBD: Gibt es mehrere Andon Leuchten?```

ID auf BPMN Diagramm: `5`
```json
{
    "eventType": "andon/machine-id/start",
    "timestamp": 1526388471,
    "payload": {
        "machineId": "machine-id"
    }
}
```
