import { useAtom } from "jotai"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"

const PopupInfo = () => {
   const [popupInfo] = useAtom(popupInfoAtom)

   return popupInfo
}

export { PopupInfo }
