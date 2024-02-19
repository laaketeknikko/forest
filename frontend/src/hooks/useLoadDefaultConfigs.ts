import { loadDefaultConfigs } from "../services/defaultConfigsLoader"
import { defaultConfigsAtom } from "../game/state/jotai/gameState"
import { useAtom } from "jotai"

/**
 * Uses atom defaultConfigsAtom.
 *
 * When loadConfigs is called, sets the atom value with the configs.
 */
const useLoadDefaultConfigs = () => {
   const [defaultConfigs, setDefaultConfigs] = useAtom(defaultConfigsAtom)

   const loadConfigs = async () => {
      const configs = await loadDefaultConfigs()
      setDefaultConfigs(configs)
   }

   return {
      loadConfigs: loadConfigs,
      characters: defaultConfigs.characters,
      enemies: defaultConfigs.enemies,
      scenarios: defaultConfigs.scenarios,
   }
}

export { useLoadDefaultConfigs }
