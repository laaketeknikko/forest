import { useAtom } from "jotai"
import type { PrimitiveAtom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"
import { CharacterSelectionItem } from "../../../config/types"

export type HandleSelectionFunc = (option: CharacterSelectionItem) => void

export interface CharacterOptionProps {
   characterAtom: PrimitiveAtom<ZCharacter>
   handleSelection: HandleSelectionFunc
}

/**
 * Used to display a character option in the character selection menu
 *
 */
const CharacterOption = ({
   characterAtom,
   handleSelection,
}: CharacterOptionProps) => {
   const [characterData] = useAtom(characterAtom)

   const option = {
      name: characterData.name,
      spritePath: characterData.spritePath,
      characterAtom: characterAtom,
   }

   return (
      <img
         onClick={() => handleSelection(option)}
         src={characterData.spritePath}
         className="character-selection-img"
         title={characterData.name}
      />
   )
}

export { CharacterOption }
