import { PrimitiveAtom, useSetAtom } from "jotai"
import { useAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import { popupInfoAtom } from "../../../game/state/jotai/gameState"
import { CharacterPopupInfo } from "../PopupInfo.tsx/CharacterPopupInfo"
import { memo } from "react"

interface TurnOrderViewItemProps {
   characterAtom: PrimitiveAtom<ZCharacter>
}

/**
 * Used in-game to display a single character in the turn order.
 */
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

const TurnOrderViewItemMemo = memo(TurnOrderViewItem)

export { TurnOrderViewItemMemo as TurnOrderViewItem }
