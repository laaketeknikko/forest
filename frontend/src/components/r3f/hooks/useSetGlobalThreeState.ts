import { useThree } from "@react-three/fiber"
import { useEffect } from "react"
import { globalThreeStateGetterAtom } from "../../../game/state/jotai/gameState"
import { useAtom } from "jotai"

const useSetGlobalThreeState = () => {
   const getThree = useThree((state) => state.get)
   const [, setGlobalThreeState] = useAtom(globalThreeStateGetterAtom)

   useEffect(() => {
      setGlobalThreeState({ get: getThree })
   }, [getThree, setGlobalThreeState])
}

export { useSetGlobalThreeState }
