import { loadDefaultConfigs } from "../services/defaultConfigsLoader"
import { defaultConfigsAtom } from "../game/state/jotai/gameState"
import { useAtom } from "jotai"
import { useCallback } from "react"

/**
 * Uses atom defaultConfigsAtom.
 *
 * When loadConfigs is called, sets the atom value with the configs.
 */
const useLoadDefaultConfigs = () => {
   const [defaultConfigs, setDefaultConfigs] = useAtom(defaultConfigsAtom)

   const loadConfigs = useCallback(async () => {
      const configs = await loadDefaultConfigs()
      setDefaultConfigs(configs)
   }, [setDefaultConfigs])

   return {
      loadConfigs: loadConfigs,
      characters: defaultConfigs.characters,
      enemies: defaultConfigs.enemies,
      scenarios: defaultConfigs.scenarios,
   }
}

export { useLoadDefaultConfigs }
