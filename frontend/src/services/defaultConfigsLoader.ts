const loadDefaultCharacterConfigs = async () => {
   const response = await fetch("http://localhost:3000/api/configs/characters")
   const json = await response.json()
   return json
}

const loadDefaultEnemyConfigs = async () => {
   const response = await fetch("http://localhost:3000/api/configs/enemies")
   const json = await response.json()
   return json
}

const loadDefaultScenarioConfigs = async () => {
   const response = await fetch("http://localhost:3000/api/configs/scenarios")
   const json = await response.json()
   return json
}

const loadDefaultConfigs = async () => {
   const characterConfigs = await loadDefaultCharacterConfigs()
   const enemyConfigs = await loadDefaultEnemyConfigs()
   const scenarioConfigs = await loadDefaultScenarioConfigs()

   const configs = {
      characters: characterConfigs,
      enemies: enemyConfigs,
      scenarios: scenarioConfigs,
   }

   return configs
}

export {
   loadDefaultConfigs,
   loadDefaultCharacterConfigs,
   loadDefaultScenarioConfigs,
   loadDefaultEnemyConfigs,
}
