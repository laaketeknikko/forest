const loadDefaultCharacterConfigs = async () => {
   const response = await fetch("http://localhost:3000/api/configs/characters")
   console.log("loaddefaultconfigs, response: ", response)

   const json = response.json()

   return json
}

const loadDefaultEnemyConfigs = async () => {
   const response = await fetch("http://localhost:3000/api/configs/enemies")
   const json = response.json()
   return json
}

const loadDefaultScenarioConfigs = async () => {
   const response = await fetch("http://localhost:3000/api/configs/scenarios")
   const json = response.json()
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

export { loadDefaultConfigs }
