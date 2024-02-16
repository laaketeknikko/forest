import { useAtom } from "jotai"
import type { Atom } from "jotai"
import { ZCharacter } from "../../../../../shared/types/types"

interface Option {
   name: string
   spritePath: string
   characterAtom: Atom<ZCharacter>
}

type HandleSelectionFunc = (option: Option) => void

interface CharacterOptionProps {
   characterAtom: Atom<ZCharacter>
   handleSelection: HandleSelectionFunc
}

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
      />
   )
}

export { CharacterOption }
