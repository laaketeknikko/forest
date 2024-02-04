const serverRoot = import.meta.env.VITE_SERVER_LOCATION

const loadDefaultCharacterConfigs = async () => {
   const response = await fetch(`${serverRoot}/api/configs/characters`)
   const json = await response.json()
   return json
}

const loadDefaultEnemyConfigs = async () => {
   const response = await fetch(`${serverRoot}/api/configs/enemies`)
   const json = await response.json()
   return json
}

const loadDefaultScenarioConfigs = async () => {
   const response = await fetch(`${serverRoot}/api/configs/scenarios`)
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
