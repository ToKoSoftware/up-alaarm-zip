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
  "eventType": "devices/conveyor/stop",
  "timestamp": 1526388471
}
```

## Subwoofer starten
ID auf BPMN Diagramm: `3`

```json
{
  "eventType": "devices/subwoofer/start",
  "timestamp": 1526388471,
  "payload": {
    "soundId": "sound-id"
  }
}
```

## Lautsprecher starten
ID auf BPMN Diagramm: `4`

```json
{
  "eventType": "devices/speaker/start",
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
    "eventType": "devices/andon/start",
    "timestamp": 1526388471,
    "payload": {
        "machineId": "machine-id"
    }
}
```
