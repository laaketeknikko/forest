import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { globalThreeStateGetterAtom } from "../../../game/state/jotai/gameState"
import { useAtom } from "jotai"

const useSetGlobalThreeState = () => {
   const getThreeRef = useRef(useThree((state) => state.get))
   const [, setGlobalThreeState] = useAtom(globalThreeStateGetterAtom)

   useEffect(() => {
      setGlobalThreeState({ get: getThreeRef.current })
   }, [setGlobalThreeState])
}

export { useSetGlobalThreeState }
