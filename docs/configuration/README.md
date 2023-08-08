# Szenario Konfiguration

Ein Szenario besteht aus mehreren Eskalationsstufen. Jede Eskalationsstufe besteht aus Immersionsobjekten, wie dem Alarm-Sound, einer Maschine, die repariert werden muss und einem Reparatur-Quest. Die Eskalationsstufen werden nacheinander durchlaufen. Die letzte Eskalationsstufe ist die finale Eskalationsstufe. Wenn diese Eskalationsstufe abgeschlossen ist, ist das Szenario beendet.

Das Szenario wir durch eine JSON-Konfiguration gesteuert, welche das nachfolgende Format hat:
```json
{
  "general": {
    "timeBeforeScenarioStarts": 120,
    "attendingPersons": 2
  },
  "escalation1": {
    "soundForSubwoofer": "sound-id",
    "soundForAlarm": "sound-id",
    "machineToRepair": "machine-id",
    "repairQuest": {
      "questId": "quest-id",
      "successfulRepairLeadsToScenarioEnd": false,
      "solvingTime": 120
    }
  },
  "escalation2": {
    "soundForSubwoofer": "sound-id",
    "soundForAlarm": "sound-id",
    "machineToRepair": "machine-id",
    "repairQuest": {
      "questId": "quest-id",
      "successfulRepairLeadsToScenarioEnd": false,
      "solvingTime": 120
    }
  },
  "escalation3": {
    "soundForSubwoofer": "sound-id",
    "soundForAlarm": "sound-id",
    "machineToRepair": "machine-id",
    "repairQuest": {
      "questId": "quest-id",
      "successfulRepairLeadsToScenarioEnd": true,
      "solvingTime": 120
    }
  } 
}
```
