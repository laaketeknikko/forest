import { useState, useEffect } from "react"
import { loadDefaultConfigs } from "../services/defaultConfigsLoader"

const useLoadDefaultConfigs = () => {
   const [characterConfigs, setCharacterConfigs] = useState([])
   const [enemyConfigs, setEnemyConfigs] = useState([])
   const [scenarioConfigs, setScenarioConfigs] = useState([])

   useEffect(() => {
      loadDefaultConfigs().then((configs) => {
         setCharacterConfigs(configs.characters)
         setEnemyConfigs(configs.enemies)
         setScenarioConfigs(configs.scenarios)
      })
   }, [])

   return {
      characters: characterConfigs,
      enemies: enemyConfigs,
      scenarios: scenarioConfigs,
   }
}

export { useLoadDefaultConfigs }
