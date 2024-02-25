import { PrimitiveAtom, useSetAtom } from "jotai"
import { useAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"
import { CharacterPopupInfo } from "../PopupInfo.tsx/CharacterPopupInfo"

interface TurnOrderViewItemProps {
   characterAtom: PrimitiveAtom<ZCharacter>
}

const TurnOrderViewItem = ({ characterAtom }: TurnOrderViewItemProps) => {
   const [character] = useAtom(characterAtom)
   const setPopupInfo = useSetAtom(popupInfoAtom)

   return (
      <img
         className="turn-order-image"
         src={character.spritePath}
         onMouseEnter={() =>
            setPopupInfo(<CharacterPopupInfo characterAtom={characterAtom} />)
         }
         onMouseLeave={() => setPopupInfo(null)}
      />
   )
}

export { TurnOrderViewItem }
