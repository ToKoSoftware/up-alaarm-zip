# API Definition

## Events

Events werden über MQTT gesendet. Eine Nachricht, welche übermittelt wird folgt dem folgenden Schema:

```json
{
  "eventType": "$EVENT-NAME",
  "payload": {
    "key": "value"
  },
  "timestamp": "$TIMESTAMP"
}
```

Wobei

```$TIMESTAMP``` ein Unix Timestamp in Sekunden, und ```$EVENT-NAME``` der Name des Events ist. Definitionen der Events und deren Payloads sind in den folgenden Kapiteln zu finden.

| Beschreibung         | Link                                                            |
|----------------------|-----------------------------------------------------------------|
| Szenario starten     | [00_general_start.md](events%2F00_general_start.md)             |
| Eskalation 1 starten | [01_escalation_1_start.md](01_escalation_1_start.md)            |
| Eskalation 1 Rätsel  | [01a_escalation_1_quest.md](events%2F01a_escalation_1_quest.md) |
| Eskalation 2 starten | [02_escalation_2_start.md](events%2F02_escalation_2_start.md)   |
| Eskalation 2 Rätsel  | [02a_escalation_2_quest.md](events%2F02a_escalation_2_quest.md) |
| Eskalation 3 starten | [03_escalation_3_start.md](events%2F03_escalation_3_start.md)   |
| Eskalation 1 Rätsel  | [03a_escalation_3_quest.md](events%2F03a_escalation_3_quest.md) |
| Szenario beenden     | [99_general_stop.md](events%2F99_general_stop.md)               |


## Rest--API-Routen
