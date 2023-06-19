# Eskalation 2 Starten
```json
{
  "eventType": "general/escalation1/start",
  "timestamp": 1526388471
}
```
## Eskalation 1 Stoppen
```json
{
  "eventType": "general/escalation1/stop",
  "timestamp": 1526388471
}
```

## Subwoofer starten
ID auf BPMN Diagramm: `9`

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
ID auf BPMN Diagramm: `10`

```json
{
  "eventType": "devices/speaker/start",
  "timestamp": 1526388471,
  "payload": {
    "soundId": "sound-id"
  }
}
```

## Vaporizer starten
ID auf BPMN Diagramm: `11`

```json
{
    "eventType": "devices/vaporizer/start",
    "timestamp": 1526388471,
    "payload": {
        "intensity": "light"
    }
}
```

## LED-Streifen starten
ID auf BPMN Diagramm: `12`

```json
{
    "eventType": "devices/led-strip/start",
    "timestamp": 1526388471,
    "payload": {
      "color": "blue",
      "effect": "strobo"
    }
}
```
