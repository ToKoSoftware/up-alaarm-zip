# Configuration

```json
{
  "general": {
    "timeBeforeScenarioStarts": 120
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
