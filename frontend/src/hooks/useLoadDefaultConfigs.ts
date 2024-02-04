import { useState } from "react"
import { loadDefaultConfigs } from "../services/defaultConfigsLoader"

const useLoadDefaultConfigs = () => {
   const [characterConfigs, setCharacterConfigs] = useState([])
   const [enemyConfigs, setEnemyConfigs] = useState([])
   const [scenarioConfigs, setScenarioConfigs] = useState([])

   const loadConfigs = async () => {
      loadDefaultConfigs().then((configs) => {
         console.log("Configs loaded", configs)
         setCharacterConfigs(configs.characters)
         setEnemyConfigs(configs.enemies)
         setScenarioConfigs(configs.scenarios)
      })
   }

   return {
      loadConfigs: loadConfigs,
      characters: characterConfigs,
      enemies: enemyConfigs,
      scenarios: scenarioConfigs,
   }
}

export { useLoadDefaultConfigs }
