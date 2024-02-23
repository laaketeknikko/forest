import { Atom, useSetAtom } from "jotai"
import { useAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"

interface TurnOrderViewItemProps {
   characterAtom: Atom<ZCharacter>
}

const TurnOrderViewItem = ({ characterAtom }: TurnOrderViewItemProps) => {
   const [character] = useAtom(characterAtom)
   const setPopupInfo = useSetAtom(popupInfoAtom)

   return (
      <img
         className="turn-order-image"
         src={character.spritePath}
         onMouseEnter={() => setPopupInfo(character)}
         onMouseLeave={() => setPopupInfo(null)}
      />
   )
}

export { TurnOrderViewItem }
